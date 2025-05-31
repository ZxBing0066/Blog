import blackaiScreenshot from '@src/assets/project/blackai.png';
import chineseColorsScreenshot from '@src/assets/project/chinese-colors.png';
import freeToolsScreenshot from '@src/assets/project/free-tools.png';
import funaiScreenshot from '@src/assets/project/funai.png';
import gfwlistEditorScreenshot from '@src/assets/project/gfwlist-editor.png';
import githubMdMakerScreenshot from '@src/assets/project/github-md-maker.png';
import pixelScreenshot from '@src/assets/project/pixel.png';
import rapiopScreenshot from '@src/assets/project/rapiop.png';
import tagBookmarksScreenshot from '@src/assets/project/tag-bookmarks.png';
import tumblrScreenshot from '@src/assets/project/tumblr.png';
import projectRepos from '@src/content/projectRepos.json';

const topicMap: Record<string, string> = {
    website: '网站',
    tool: '工具',
    'browser-extension': '浏览器插件',
    game: '游戏',
    ai: 'AI',
    design: '设计',
    library: '库',
};

interface ProjectPatch {
    id: string;
    name: string;
}

interface ProjectMetadata {
    description: string;
    link?: string;
    repo?: string;
    tags?: string[];

    stars?: number;

    image?: ImageMetadata;

    createdAt: string;

    favorite?: boolean;
    private?: boolean;
    wip?: boolean;
    hide?: boolean;
}

type ProjectInfo = ProjectPatch & Partial<ProjectMetadata>;

const projectInfos: ProjectInfo[] = [
    {
        id: 'free-tools',
        name: 'Free Tools',
        image: freeToolsScreenshot,
        favorite: true,
    },
    {
        id: 'funai',
        name: 'FunAI 工具导航',
        image: funaiScreenshot,
        favorite: true,
    },
    {
        id: 'pixel-converter',
        name: '像素风转换器',
        image: pixelScreenshot,
        favorite: true,
    },
    {
        id: 'tag-bookmarks',
        name: 'Chrome 书签标签管理',
        description: '安装后可为自己的书签添加标签 🏷️，方便筛选和管理自己的书签，适合书签重度患者，有效缓解书签焦虑。',
        image: tagBookmarksScreenshot,
        favorite: true,
    },
    {
        id: 'github-md-maker',
        name: 'GitHub Markdown 生成器',
        description: '一个 GitHub Markdown 生成器，方便生成 GitHub Profile 和项目 README 的 Markdown 内容。',
        image: githubMdMakerScreenshot,
        favorite: true,
    },
    {
        id: 'chinese-colors',
        name: '中国色彩 · 一键配色',
        image: chineseColorsScreenshot,
        favorite: true,
    },
    {
        id: 'rapiop',
        name: '微前端库',
        description: '一个微前端库，支持多种框架，支持 tapable 插件机制，体积小，无侵入，支持渐进式迁移。',
        image: rapiopScreenshot,
        favorite: true,
    },
    {
        id: 'micro-mod',
        name: '模块加载器',
        favorite: true,
    },
    {
        id: 'rvpress',
        name: 'React & Vite 静态站点生成器',
        description: '一个基于 React 和 Vite 的静态站点生成器，支持 Markdown 和 React 组件，支持自定义主题。VitePress 的 React 魔改版本。',
        tags: ['库'],
    },
    {
        id: 'z-sandbox',
        name: 'JS 沙箱实现',
        description: '一个简单的 JS 沙箱实现，支持多种隔离策略。',
    },
    {
        id: 'recodo',
        name: 'React 组件文档套件',
        description: 'React 组件文档相关的一系列工具集。包括运行时编译器、组件文档生成器、实时代码编辑器等。',
        favorite: true,
    },
    {
        id: 'knowledge-base',
        name: '知识库',
        hide: true,
    },
    {
        id: 'zlib',
        name: '工具库',
        description: '几个小工具库，包括 Diff、密码生成、乱序。',
    },
    {
        id: 'calendar',
        name: 'React 日历实现',
        description: '一个纯净无依赖的 React 日历组件。',
        repo: 'https://github.com/UCloud-FE/calendar',
        tags: ['库'],
        createdAt: '2021-05-09',
    },
    {
        id: 'tumblr-aggregate',
        name: 'Tumblr 多媒体下载站',
        image: tumblrScreenshot,
    },
    {
        id: 'chrome-plugin-gfwlist-editor',
        name: 'Chrome GFW 文件编辑器扩展',
        description: '一个简单的 GFW 文件编辑器。',
        link: 'https://chrome.google.com/webstore/detail/gfwlist-editor/bmiphmkhfkmaacdjcokdfjllbnklnmlf?hl=zh-CN',
        repo: 'https://github.com/ZxBing0066/chrome-plugin-gfwlist-editor',
        tags: ['浏览器插件', '工具'],
        image: gfwlistEditorScreenshot,
    },
    {
        id: 'zreact',
        name: 'React 组件库',
    },
    {
        id: 'shields-io-badge-maker',
        name: 'Shield.io 徽章制作',
    },
    {
        id: 'retirement-age-calculator',
        name: '法定退休年龄计算器',
    },
    {
        id: 'gengbaike',
        name: '梗百科',
    },
    {
        id: 'mb2md',
        name: '幕布转 Markdown',
    },
    {
        id: 'cookie-lab',
        name: 'Cookie 实验室',
    },
    {
        id: '2048',
        name: '2048',
        description: '一个 2048 小游戏。',
        link: 'https://legacy.heyfe.org/Game/2048/',
        repo: 'https://github.com/ZxBing0066/ZxBing0066.github.io/tree/master/Game/2048',
        tags: ['游戏'],
        createdAt: '2014-10-02',
    },
    {
        id: 'td',
        name: '塔防小游戏',
        description: '一个塔防小游戏。',
        link: 'https://legacy.heyfe.org/Game/td/',
        repo: 'https://github.com/ZxBing0066/ZxBing0066.github.io/tree/master/Game/td',
        tags: ['游戏'],
        createdAt: '2014-04-22',
    },
    {
        id: 'anqi',
        name: '暗棋',
        description: '小时候的回忆。',
        link: 'https://legacy.heyfe.org/Game/anqi/',
        repo: 'https://github.com/ZxBing0066/ZxBing0066.github.io/tree/master/Game/anqi',
        tags: ['游戏'],
        createdAt: '2013-08-11',
    },
    {
        id: 'block',
        name: '俄罗斯方块',
        description: '随手写的俄罗斯方块。',
        link: 'https://legacy.heyfe.org/Game/block/',
        repo: 'https://github.com/ZxBing0066/ZxBing0066.github.io/tree/master/Game/block',
        tags: ['游戏'],
        createdAt: '2013-01-30',
    },
    {
        id: 'snake',
        name: '贪吃蛇',
        description: '刚毕业时写的贪吃蛇。',
        link: 'https://legacy.heyfe.org/Game/snake/',
        repo: 'https://github.com/ZxBing0066/ZxBing0066.github.io/tree/master/Game/snake',
        tags: ['游戏'],
        createdAt: '2012-10-27',
    },
    {
        id: 'click-timer-challenge',
        name: '点击计时挑战',
    },
    {
        id: 'funai-copilot',
        name: 'FunAI AI 助手',
    },
    {
        id: 'chinese-poetry',
        name: '中文诗词',
        hide: true,
    },
    {
        id: 'shake-your-mooncake',
        name: '摇出你的本命月饼',
        description: '🌕 摇出你的本命月饼 🥮，一个简单的中秋节小游戏。',
    },
    {
        id: 'poetry-reader',
        name: '诗歌朗诵',
        description: '一个诗歌朗诵网站，随机古诗词调用浏览器 TTS 功能进行朗诵。',
    },
    {
        id: 'speech-recognition',
        name: '语音识别',
        description: '一个语音识别网站，演示浏览器语音识别功能。',
    },
    {
        id: 'tumblr-capturer',
        name: 'Tumblr 视频下载器',
        description: '一个 Python 写的 Tumblr 视频下载器应用，可以批量下载 Tumblr 上的视频。',
        tags: ['工具', '应用'],
    },
    {
        id: 'blackai.app',
        name: 'BlackAI',
        description: '一个免费的 AI 图片生成工具网站，支持多种 AI 生图模型。',
        link: 'https://blackai.app',
        repo: 'https://github.com/BlackAI-app/blackai.app',
        private: true,
        tags: ['网站', 'AI'],
        createdAt: '2025-03-14',
        favorite: true,
        image: blackaiScreenshot,
        hide: true,
    },
    {
        id: 'react-components',
        name: 'React 组件',
        description: '一个完善的高性能 React 组件库。',
        repo: 'https://github.com/UCloud-FE/react-components',
        tags: ['库'],
        createdAt: '2018-06-20',
        stars: 52,
    },
];

export const projects = projectInfos.map((info) => {
    const repo = projectRepos.find((repo) => repo.name === info.id);
    if (!repo) {
        return info;
    }
    return {
        description: repo.description,
        link: repo.homepage,
        repo: repo.html_url,
        tags: repo.topics.map((topic) => (topic in topicMap ? topicMap[topic] : null)).filter(Boolean),
        stars: repo.stars,
        createdAt: repo.firstCommitAt,
        private: repo.isPrivate,
        ...info,
    };
});
