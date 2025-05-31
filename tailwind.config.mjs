/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    safelist: [
        'bg-me-primary',
        'bg-me-secondary',
        'bg-me-accent',
        'bg-me-background',
        'bg-me-background/2',
        'text-me-text',
        'bg-blog-primary',
        'bg-blog-secondary',
        'bg-blog-accent',
        'bg-blog-background',
        'bg-blog-background/2',
        'text-blog-text',
        'bg-project-primary',
        'bg-project-secondary',
        'bg-project-accent',
        'bg-project-background',
        'text-project-text',
        'variable-theme-me',
        'variable-theme-blog',
        'variable-theme-project',
    ],
    darkMode: 'class',
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            screens: {
                portrait: { raw: '(orientation: portrait)' },
                landscape: { raw: '(orientation: landscape)' },
                // 你也可以结合 min-width 或 max-width 来更精细地控制
                // 'sm-portrait': { 'raw': '(min-width: 640px) and (orientation: portrait)' },
            },
            colors: {
                // 主题色彩
                primary: {
                    DEFAULT: '#3490dc',
                    50: '#ebf5ff',
                    100: '#e1effe',
                    200: '#c3ddfd',
                    300: '#a4cafc',
                    400: '#76a9fa',
                    500: '#3f83f8',
                    600: '#1c64f2',
                    700: '#1a56db',
                    800: '#1e429f',
                    900: '#233876',
                },
                // 介绍模块配色 - 橙色
                me: {
                    primary: '#ff9900',
                    secondary: '#ffcc00',
                    accent: '#ffcc00',
                    background: '#ff9900',
                    text: '#ffffff',
                },
                // me: {
                //     primary: '#333333',
                //     secondary: '#666666',
                //     accent: '#999999',
                //     background: '#111111',
                //     text: '#ffffff',
                // },
                // 博客模块配色 - 蓝色
                // blog: {
                //     primary: '#1661ab',
                //     secondary: '#b0d5df',
                //     accent: '#1661ab',
                //     background: '#f0f8ff',
                //     text: '#030d17',
                // },
                // 笔记模块配色 - 蓝色
                blog: {
                    primary: '#0088ff',
                    secondary: '#00aaff',
                    accent: '#66ccff',
                    background: '#0066cc',
                    text: '#ffffff',
                },
                // project 模块配色 - 紫色
                project: {
                    primary: '#9933ff',
                    secondary: '#aa66ff',
                    accent: '#cc99ff',
                    background: '#6600cc',
                    text: '#ffffff',
                },
            },
            fontFamily: {
                sans: ['system-ui', 'sans-serif'],
                mono: ['monospace'],
                pixel: ['PixelFont', 'cursive'],
                chinese: ['Xingkai SC', 'STKaiTi', 'KaiTi SC', '"Noto Sans SC"', 'STXingkai', 'sans-serif', '楷体'],
                me: ['Xingkai SC', 'STKaiTi', '"Noto Sans SC"', 'STXingkai', 'sans-serif', '楷体'],
                blog: ['Kai', 'Baoli SC', '"Noto Sans SC"', 'STXingkai', 'Xingkai SC', 'STKaiTi', 'sans-serif', '黑体'],
                note: ['KaiTi SC', 'STKaiTi', 'Xingkai SC', '"Noto Sans SC"', 'STXingkai', '微软雅黑'],
                project: ['PixelFont', 'cursive'],
                xingshu: ['XingShuFont', 'sans-serif'],
            },
            animation: {
                glow: 'glow 1.5s ease-in-out infinite',
            },
            keyframes: {
                glow: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
            },
        },
    },
    plugins: [],
};

// #2983bb
// #ed3b2f
