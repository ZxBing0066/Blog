// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import rehypeExternalLinks from 'rehype-external-links';
import remarkDirective from 'remark-directive';

import { noteDirectiveRemarkPlugin } from './plugins/note-directive';
import { youtubeDirectiveRemarkPlugin } from './plugins/youtube-directive';
import rehypeWrapImages from './plugins/rehype-wrap-images';

// https://astro.build/config
export default defineConfig({
    site: 'https://blog.heyfe.org',
    integrations: [
        react(),
        tailwind({
            configFile: './tailwind.config.mjs'
        }),
        mdx({
            remarkPlugins: [remarkDirective, youtubeDirectiveRemarkPlugin, noteDirectiveRemarkPlugin],
            rehypePlugins: [rehypeWrapImages, [rehypeExternalLinks, { target: '_blank', rel: ['nofollow'] }]]
        }),
        sitemap()
    ],
    build: {
        format: 'file'
    },
    markdown: {
        remarkPlugins: [remarkDirective, youtubeDirectiveRemarkPlugin, noteDirectiveRemarkPlugin],
        rehypePlugins: [rehypeWrapImages, [rehypeExternalLinks, { target: '_blank', rel: ['nofollow'] }]]
    }
});
