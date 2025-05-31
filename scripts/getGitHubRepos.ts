import 'dotenv/config'; // For loading .env file

import fs from 'fs';

// Native fetch is available in Node.js 18+.
// No specific import needed for fetch itself if your Node version is sufficient.

// --- Configuration ---
const GITHUB_API_BASE_URL = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const API_VERSION = '2022-11-28';
// Delay between fetching commit data for different repositories to be nice to the API
const DELAY_BETWEEN_REPO_COMMIT_FETCH_MS = 200; // milliseconds

// --- Interfaces (as per your version) ---
interface GitHubRepo {
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    homepage: string | null;
    topics: string[];
    language: string | null;
    private: boolean;
    fork: boolean;
    archived: boolean;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    license: { name: string; spdx_id: string } | null;
    default_branch: string;
    visibility: 'public' | 'private' | 'internal';
    size: number; // Size in KB
}

interface GitHubCommitDetails {
    author: { name?: string; email?: string; date?: string };
    committer: { name?: string; email?: string; date?: string };
    message: string;
}

interface GitHubCommitListItem {
    sha: string;
    commit: GitHubCommitDetails;
    html_url: string;
}

interface RepoDataOutput {
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    homepage: string | null;
    topics: string[];
    language: string | null;
    isPrivate: boolean;
    isFork: boolean;
    isArchived: boolean;
    visibility: string;
    stars: number;
    watchers: number;
    forks: number;
    openIssues: number;
    licenseName: string | null;
    defaultBranch: string;
    sizeInKB: number;
    firstCommitAt: string | null | 'EMPTY_REPO' | 'NO_COMMITS';
    createdAt: string;
    updatedAt: string;
    pushedAt: string;
}

interface RateLimitInfo {
    limit: string | null;
    remaining: string | null;
    reset: string | null; // ISO string for reset time
    used: string | null;
}

interface GitHubErrorPayload {
    message: string;
    documentation_url?: string;
    errors?: Array<{ resource: string; field: string; code: string; message?: string }>;
}

// --- Global Fetch Headers ---
let commonHeaders: Record<string, string>; // Using Record<string, string> for broader compatibility

function initializeGlobalConfig() {
    if (!GITHUB_TOKEN) {
        console.error('❌ Error: GITHUB_TOKEN environment variable is not set.');
        console.log('Please create a .env file with GITHUB_TOKEN="your_pat_here" or set it in your environment.');
        process.exit(1);
    }
    commonHeaders = {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': API_VERSION,
    };
}

// --- Utility Functions ---
function parseLinkHeader(linkHeaderValue: string | null): Record<string, string> {
    if (!linkHeaderValue) {
        return {};
    }
    const links: Record<string, string> = {};
    const parts = linkHeaderValue.split(',');
    parts.forEach((part) => {
        const section = part.split(';');
        if (section.length < 2) return;
        try {
            const url = section[0].replace(/<(.*)>/, '$1').trim();
            const name = section[1].replace(/rel="(.*)"/, '$1').trim();
            links[name] = url;
        } catch (e) {
            console.warn('⚠️ Could not parse link header part:', part, e);
        }
    });
    return links;
}

function getRateLimitInfo(headers: Headers): RateLimitInfo {
    return {
        limit: headers.get('x-ratelimit-limit'),
        remaining: headers.get('x-ratelimit-remaining'),
        reset: headers.get('x-ratelimit-reset') ? new Date(Number(headers.get('x-ratelimit-reset')) * 1000).toISOString() : null,
        used: headers.get('x-ratelimit-used'),
    };
}

async function fetchGitHubAPI<T>(
    urlPathWithQuery: string,
    options?: RequestInit,
): Promise<{ data: T | GitHubErrorPayload | null; headers: Headers; status: number; ok: boolean }> {
    const requestUrl = urlPathWithQuery.startsWith('http') ? urlPathWithQuery : `${GITHUB_API_BASE_URL}${urlPathWithQuery}`;

    let response: Response;
    try {
        response = await fetch(requestUrl, {
            ...options,
            headers: {
                ...commonHeaders,
                ...(options?.headers || {}),
            },
        });
    } catch (networkError) {
        // Handle actual network errors (e.g., DNS resolution, server unreachable)
        console.error(`❌ Network error while fetching ${requestUrl}:`, networkError);
        // Simulate a Response-like structure for consistent error handling downstream if needed,
        // or rethrow/handle differently. For now, let's make it return a structure indicating failure.
        // This part might need more robust error object shaping depending on how callers use it.
        // For simplicity, we'll let it propagate and be caught by higher-level try-catch.
        throw networkError;
    }

    let responseData: any = null; // Use 'any' initially for flexibility with error payloads
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
        try {
            responseData = await response.json();
        } catch (e) {
            // This can happen if the server sends an empty response with application/json, or malformed JSON
            console.warn(`⚠️ Could not parse JSON response from ${requestUrl}. Status: ${response.status}. Error:`, e);
            // responseData remains null or you could try response.text() as a fallback
        }
    } else if (!response.ok) {
        // If not JSON and not ok, try to get text for error context
        try {
            const textError = await response.text();
            responseData = { message: textError || `Request failed with status ${response.status}` };
        } catch (textErr) {
            responseData = { message: `Request failed with status ${response.status} and couldn't read error text.` };
        }
    }

    return { data: responseData as T | GitHubErrorPayload | null, headers: response.headers, status: response.status, ok: response.ok };
}

async function getFirstCommitDate(repoFullName: string): Promise<string | null | 'EMPTY_REPO' | 'NO_COMMITS'> {
    console.log(`   🔎 Fetching first commit date for ${repoFullName}...`);
    try {
        let commitsUrlPath = `/repos/${repoFullName}/commits?per_page=1`;
        let apiResponse = await fetchGitHubAPI<GitHubCommitListItem[]>(commitsUrlPath);

        if (!apiResponse.ok) {
            const errorPayload = apiResponse.data as GitHubErrorPayload | null;
            if (apiResponse.status === 409) {
                // Git Repository is empty.
                console.warn(`   ⚠️ Repository ${repoFullName} is empty.`);
                return 'EMPTY_REPO';
            }
            if (apiResponse.status === 404) {
                console.warn(`   ⚠️ Repository ${repoFullName} not found or inaccessible for commits.`);
                return null;
            }
            console.error(
                `   ❌ Error fetching commits for ${repoFullName} (initial): ${apiResponse.status} - ${errorPayload?.message || 'Unknown error'}`,
            );
            return null;
        }

        const linkHeader = apiResponse.headers.get('link');
        const links = parseLinkHeader(linkHeader);
        let firstCommitData: GitHubCommitListItem | undefined = undefined;

        if (links.last) {
            // links.last is an absolute URL, so pass it directly
            apiResponse = await fetchGitHubAPI<GitHubCommitListItem[]>(links.last);
            if (!apiResponse.ok) {
                const errorPayload = apiResponse.data as GitHubErrorPayload | null;
                console.error(
                    `   ❌ Error fetching last page of commits for ${repoFullName}: ${apiResponse.status} - ${errorPayload?.message || 'Unknown error'}`,
                );
                return null;
            }
            const commitsOnLastPage = apiResponse.data as GitHubCommitListItem[]; // data is now T if ok
            if (commitsOnLastPage && commitsOnLastPage.length > 0) {
                firstCommitData = commitsOnLastPage[commitsOnLastPage.length - 1];
            }
        } else {
            const initialCommits = apiResponse.data as GitHubCommitListItem[];
            if (initialCommits && initialCommits.length > 0) {
                // Commits found on the first (per_page=1) call
                // This means either 1 commit total, or >1 but all fit on one page.
                // To be sure we get the *actual* first one, fetch the full first page.
                const allFirstPageCommitsResponse = await fetchGitHubAPI<GitHubCommitListItem[]>(`/repos/${repoFullName}/commits?per_page=100`);
                if (!allFirstPageCommitsResponse.ok) {
                    const errorPayload = allFirstPageCommitsResponse.data as GitHubErrorPayload | null;
                    if (allFirstPageCommitsResponse.status === 409) {
                        console.warn(`   ⚠️ Repository ${repoFullName} is empty (on re-fetch).`);
                        return 'EMPTY_REPO';
                    }
                    console.error(
                        `   ❌ Error fetching full first page of commits for ${repoFullName}: ${allFirstPageCommitsResponse.status} - ${errorPayload?.message || 'Unknown error'}`,
                    );
                    return null;
                }
                const allCommits = allFirstPageCommitsResponse.data as GitHubCommitListItem[];
                if (allCommits && allCommits.length > 0) {
                    firstCommitData = allCommits[allCommits.length - 1];
                } else {
                    return 'NO_COMMITS'; // No commits found even on full page fetch
                }
            } else {
                // No commits on per_page=1 call and no 'last' link
                return 'NO_COMMITS';
            }
        }

        if (firstCommitData) {
            return firstCommitData.commit?.committer?.date || firstCommitData.commit?.author?.date || null;
        }
    } catch (error) {
        console.error(`   ❌ Network or unexpected error fetching commits for ${repoFullName}:`, error);
    }
    return null;
}

async function fetchAllUserRepos(): Promise<RepoDataOutput[]> {
    const collectedRepos: RepoDataOutput[] = [];
    let page = 1;
    const perPage = 100;
    let rateLimitInfoAtLastRepoFetch: RateLimitInfo | null = null;

    console.log('⏳ Fetching your repositories from GitHub...');
    console.log(`   (Using endpoint: /user/repos with affiliation=owner)`);

    try {
        while (true) {
            console.log(`   Fetching page ${page} of repositories...`);
            const queryParams = new URLSearchParams({
                affiliation: 'owner',
                sort: 'pushed',
                direction: 'desc',
                per_page: perPage.toString(),
                page: page.toString(),
            });
            const reposListResponse = await fetchGitHubAPI<GitHubRepo[]>(`/user/repos?${queryParams.toString()}`);

            if (!reposListResponse.ok) {
                const errorPayload = reposListResponse.data as GitHubErrorPayload | null;
                console.error(`❌ API Error fetching repositories: ${reposListResponse.status} - ${errorPayload?.message || 'Unknown error'}`);
                rateLimitInfoAtLastRepoFetch = getRateLimitInfo(reposListResponse.headers);
                break;
            }

            rateLimitInfoAtLastRepoFetch = getRateLimitInfo(reposListResponse.headers);
            const reposOnPage = reposListResponse.data as GitHubRepo[]; // Data is T if ok

            if (!reposOnPage || reposOnPage.length === 0) {
                console.log('   ✅ No more repositories found or API returned empty data.');
                break;
            }

            console.log(`   ✅ Fetched ${reposOnPage.length} repositories on page ${page}. Processing for first commit dates...`);

            for (let i = 0; i < reposOnPage.length; i++) {
                const repo = reposOnPage[i];
                console.log(`   (${page}-${i + 1}/${reposOnPage.length}) Processing: ${repo.full_name}`);

                let firstCommitDate: string | null | 'EMPTY_REPO' | 'NO_COMMITS' = null;
                if (repo.size === 0 && !repo.fork) {
                    console.log(
                        `   ❕ Repository ${repo.full_name} has size 0, attempting to get first commit date anyway (API 409 will confirm if truly empty).`,
                    );
                }
                firstCommitDate = await getFirstCommitDate(repo.full_name);

                collectedRepos.push({
                    name: repo.name,
                    full_name: repo.full_name,
                    html_url: repo.html_url,
                    description: repo.description,
                    homepage: repo.homepage,
                    topics: repo.topics,
                    language: repo.language,
                    isPrivate: repo.private,
                    isFork: repo.fork,
                    isArchived: repo.archived,
                    visibility: repo.visibility,
                    stars: repo.stargazers_count,
                    watchers: repo.watchers_count,
                    forks: repo.forks_count,
                    openIssues: repo.open_issues_count,
                    firstCommitAt: firstCommitDate,
                    createdAt: repo.created_at,
                    updatedAt: repo.updated_at,
                    pushedAt: repo.pushed_at,
                    licenseName: repo.license ? repo.license.name : null,
                    defaultBranch: repo.default_branch,
                    sizeInKB: repo.size,
                });

                if (i < reposOnPage.length - 1) {
                    await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_REPO_COMMIT_FETCH_MS));
                }
            }

            if (reposOnPage.length < perPage) {
                console.log('   ✅ Fetched all repositories on the last page.');
                break;
            }
            page++;
        }
    } catch (error) {
        console.error(`❌ Unexpected error during repository fetching loop:`, error);
    }

    if (rateLimitInfoAtLastRepoFetch) {
        console.log('\nℹ️ API Rate Limit Status (after last repo list fetch):');
        console.log(
            `   Limit: ${rateLimitInfoAtLastRepoFetch.limit}, Remaining: ${rateLimitInfoAtLastRepoFetch.remaining}, Used: ${rateLimitInfoAtLastRepoFetch.used}, Reset: ${rateLimitInfoAtLastRepoFetch.reset}`,
        );
    }
    return collectedRepos;
}

// --- Main Execution ---
async function main() {
    initializeGlobalConfig();
    console.log('🚀 Starting script to fetch repositories and their first commit dates...');
    console.warn(`🕒 This process can be time-consuming and API rate-limit intensive, especially for many repositories.`);

    const allRepoData = await fetchAllUserRepos();

    if (allRepoData.length > 0) {
        console.log(`\n✅ Successfully processed ${allRepoData.length} repositories.`);
        const outputPath = 'src/content/projectRepos.json'; // As per your script
        try {
            const dir = outputPath.substring(0, outputPath.lastIndexOf('/'));
            if (dir && !fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(outputPath, JSON.stringify(allRepoData, null, 2), 'utf-8');
            console.log(`\n📋 Final Data written to ${outputPath}`);
        } catch (err) {
            console.error(`❌ Error writing data to file ${outputPath}:`, err);
        }
    } else {
        console.log('\n🤷 No repositories were processed or an error occurred early.');
    }

    console.log('\n--- Script execution finished ---');
}

main().catch((error) => {
    console.error('💥 Unhandled error in main execution:', error);
    process.exit(1);
});
