import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// 定义常用的pubDate和updatedDate schema，以便在各个集合中复用
const dateSchema = z.union([
    z.string().transform(str => new Date(str)),
    z.date(),
    z.number().transform(num => new Date(num))
]);

const blogCollection = defineCollection({
    // 使用glob loader加载所有blog目录下的md文件
    loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: 'src/content/blog' }),
    schema: z.object({
        title: z.string(),
        pubDate: dateSchema,
        updatedDate: dateSchema.optional(),
        heroImage: z.string().default('/blog/placeholder.jpg'),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().optional().default(false),
        description: z.string().optional(),
        ignoreInList: z.boolean().optional()
    })
});

export const collections = {
    blog: blogCollection
};
