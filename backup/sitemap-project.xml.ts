import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
    const projects = await getCollection('project', ({ data }) => !data.draft);
    const sortedProjects = projects.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://heyfe.org/project</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    ${sortedProjects.map(project => `
    <url>
        <loc>https://heyfe.org/project/${project.id}</loc>
        <lastmod>${project.data.pubDate.toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`).join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}; 