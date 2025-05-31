import type { APIRoute } from 'astro';

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>https://heyfe.org/sitemap-blog.xml</loc>
    </sitemap>
    <sitemap>
        <loc>https://heyfe.org/sitemap-note.xml</loc>
    </sitemap>
    <sitemap>
        <loc>https://heyfe.org/sitemap-playground.xml</loc>
    </sitemap>
    <sitemap>
        <loc>https://heyfe.org/sitemap-project.xml</loc>
    </sitemap>
</sitemapindex>`;

export const GET: APIRoute = async () => {
    return new Response(sitemapIndex, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}; 