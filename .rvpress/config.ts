import { UserConfig, DefaultTheme } from 'rvpress';

const config: UserConfig<any> = {
    lang: 'zh-CN',
    title: 'HeyFE',
    description: "HeyFE's Blog",
    head: [
        [
            'script',
            {
                src: 'https://cdn.jsdelivr.net/npm/pace-js@latest/pace.min.js'
            }
        ]
    ],
    themeConfig: {
        lastUpdated: 'Last Updated',
        nav: [
            { text: 'Blog', link: '/', activeMatch: '^/blog/' }
            // {
            //     text: 'Category',
            //     items: [
            //         {
            //             text: 'JavaScript',
            //             link: '/category/?category=javascript'
            //         },
            //         {
            //             text: 'CSS',
            //             link: '/category/?category=CSS'
            //         },
            //         {
            //             text: 'React',
            //             link: '/category/?category=React'
            //         }
            //     ]
            // },
            // { text: 'About', link: '/about/' },
            // { text: 'Github', link: 'https://github.com/ZxBing0066/', target: '_blank' }
        ]
    }
};

export default config;
