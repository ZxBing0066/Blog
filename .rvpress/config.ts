import { UserConfig } from 'rvpress/dist/node';

const config: UserConfig<any> = {
    lang: 'zh-CN',
    title: 'HeyFE',
    description: "HeyFE's Blog",
    themeConfig: {
        logo: 'HeyFE',
        lastUpdated: 'Last Updated',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Blog', link: '/blog/' },
            {
                text: 'Category',
                items: [
                    {
                        text: 'JavaScript',
                        link: '/category/?category=javascript'
                    },
                    {
                        text: 'CSS',
                        link: '/category/?category=CSS'
                    },
                    {
                        text: 'React',
                        link: '/category/?category=React'
                    }
                ]
            },
            // { text: 'About', link: '/about/' },
            { text: 'Github', link: 'https://github.com/ZxBing0066/', target: '_blank' }
        ]
    }
};

export default config;
