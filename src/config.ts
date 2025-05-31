import AboutIcon from '@src/components/ui/icons/AboutIcon.astro';
import BlogIcon from '@src/components/ui/icons/BlogIcon.astro';
import ProjectIcon from '@src/components/ui/icons/ProjectIcon.astro';

export type ModuleKey = 'me' | 'blog' | 'project';

export const name = '嘿壳';

export const modules: {
    key: ModuleKey;
    shortTitle: string;
    title: string;
    emoji: string;
    character: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
}[] = [
    {
        key: 'me',
        shortTitle: '关于',
        title: '自我介绍',
        emoji: '🧑🏻‍💻',
        character: '历',
        desc: '了解我是谁，我在做什么',
        icon: AboutIcon,
    },
    {
        key: 'blog',
        shortTitle: '博客',
        title: '我的博客',
        emoji: '✍️',
        character: '作',
        desc: '记录我的思考与学习',
        icon: BlogIcon,
    },
    {
        key: 'project',
        shortTitle: '实践',
        title: '我的实践',
        emoji: '✨',
        character: '践',
        desc: '实验、创意和演示',
        icon: ProjectIcon,
    },
];
