import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkDirective from 'remark-directive';
import { youtubeDirectiveRemarkPlugin } from './plugins/youtube-directive';
import { noteDirectiveRemarkPlugin } from './plugins/note-directive';

// https://astro.build/config
export default defineConfig({
    site: 'https://blog.heyfe.org',
    integrations: [
        mdx({
            remarkPlugins: [remarkDirective, youtubeDirectiveRemarkPlugin, noteDirectiveRemarkPlugin]
        }),
        sitemap()
    ],
    build: {
        format: 'file'
    },
    markdown: {
        remarkPlugins: [remarkDirective, youtubeDirectiveRemarkPlugin, noteDirectiveRemarkPlugin]
    }
});
