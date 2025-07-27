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
        'variable-theme-project'
    ],
    darkMode: 'class',
    corePlugins: {
        preflight: false
    },
    theme: {
        extend: {
            screens: {
                portrait: { raw: '(orientation: portrait)' },
                landscape: { raw: '(orientation: landscape)' }
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
                    900: '#233876'
                },
                // 主题 1: Blog (基于 #0088ff)
                blog: {
                    50: '#e6f3ff',
                    100: '#b3d9ff',
                    200: '#80c0ff',
                    300: '#4da6ff',
                    400: '#1a8cff',
                    500: '#0088ff',
                    600: '#006ed9',
                    700: '#0055b3',
                    800: '#003b8c',
                    900: '#002266',
                    950: '#001133',
                    primary: '#0088ff',
                    secondary: '#00aaff',
                    accent: '#66ccff',
                    background: '#f0f8ff',
                    text: '#030d17'
                },
                // 主题 2: Project (基于 #9933ff)
                project: {
                    50: '#f5edff',
                    100: '#e6d4ff',
                    200: '#d2aeff',
                    300: '#be88ff',
                    400: '#ab61ff',
                    500: '#9933ff',
                    600: '#8a2ee6',
                    700: '#7026bf',
                    800: '#571e95',
                    900: '#3d156b',
                    950: '#240d41',
                    primary: '#9933ff',
                    secondary: '#aa66ff',
                    accent: '#cc99ff',
                    background: '#6600cc',
                    text: '#ffffff'
                },
                // 主题 3: Me (基于 #ff9900)
                me: {
                    50: '#fff5e6',
                    100: '#ffe3b3',
                    200: '#ffd180',
                    300: '#ffbf4d',
                    400: '#ffad1a',
                    500: '#ff9900',
                    600: '#d98200',
                    700: '#b36b00',
                    800: '#8c5400',
                    900: '#663d00',
                    950: '#331f00',
                    primary: '#ff9900',
                    secondary: '#ffcc00',
                    accent: '#ffcc00',
                    background: '#ff9900',
                    text: '#ffffff'
                }
            },
            fontFamily: {
                sans: ['system-ui', 'sans-serif'],
                mono: ['monospace'],
                pixel: ['PixelFont', 'cursive'],
                chinese: ['Xingkai SC', 'STKaiTi', 'KaiTi SC', '"Noto Sans SC"', 'STXingkai', 'sans-serif', '楷体'],
                me: ['STKaiTi', '"Noto Sans SC"', 'STXingkai', 'sans-serif', '楷体'],
                blog: ['Kai', 'Baoli SC', '"Noto Sans SC"', 'STXingkai', 'Xingkai SC', 'STKaiTi', 'sans-serif', '黑体'],
                note: ['KaiTi SC', 'STKaiTi', 'Xingkai SC', '"Noto Sans SC"', 'STXingkai', '微软雅黑'],
                project: ['PixelFont', 'cursive'],
                xingshu: ['XingShuFont', 'sans-serif']
            },
            animation: {
                glow: 'glow 1.5s ease-in-out infinite'
            },
            keyframes: {
                glow: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' }
                }
            }
        }
    },
    plugins: []
};

// #2983bb
// #ed3b2f
