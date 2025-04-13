// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkContainer from 'remark-container';

// https://astro.build/config
export default defineConfig({
    site: 'https://blog.heyfe.org',
    integrations: [mdx(), sitemap()],
    build: {
        format: 'file'
    },
    markdown: {
        remarkPlugins: [
            [
                remarkContainer,
                {
                    // 配置自定义容器
                    customContainers: {
                        info: {
                            className: 'info'
                        },
                        warning: {
                            className: 'warning'
                        },
                        danger: {
                            className: 'danger'
                        },
                        tip: {
                            className: 'tip'
                        },
                        note: {
                            className: 'note'
                        }
                    }
                }
            ]
        ]
    }
});
