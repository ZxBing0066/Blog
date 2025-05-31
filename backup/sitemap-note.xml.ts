import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
    const notes = await getCollection('note', ({ data }) => !data.draft);
    const sortedNotes = notes.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://heyfe.org/note</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    ${sortedNotes.map(note => `
    <url>
        <loc>https://heyfe.org/note/${note.id}</loc>
        <lastmod>${note.data.updatedDate?.toISOString() || note.data.pubDate.toISOString()}</lastmod>
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