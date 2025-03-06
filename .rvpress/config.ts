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
        ],
        [
            'link',
            {
                rel: 'shortcut icon',
                href: 'favicon.svg'
            }
        ],
        // <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1906392499705020" crossorigin="anonymous"></script>
        [
            'script',
            {
                src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1906392499705020',
                crossorigin: 'anonymous'
            }
        ]
    ],
    themeConfig: {
        lastUpdated: 'Last Updated',
        nav: [
            // { text: 'Blog', link: '/', activeMatch: '^/blog/' }
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
            { text: '主站', link: 'https://www.heyfe.org/' },
            { text: 'Github', link: 'https://github.com/ZxBing0066/', target: '_blank' }
        ]
    }
};

export default config;
