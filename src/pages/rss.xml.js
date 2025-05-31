import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const posts = await getCollection('blog');
    return rss({
        title: '嘿壳 | 博客',
        description: '嘿壳的个人博客',
        site: context.site,
        items: posts.map((post) => ({
            ...post.data,
            link: `/blog/${post.id}/`,
        })),
    });
}
