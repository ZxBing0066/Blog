import React, { HTMLAttributes, useMemo } from 'react';
import { Content, PageData, useData } from 'rvpress';

import { getPageCreateTime } from '../utils';
import BlogTime from './BlogTime';
import cls from './List.module.scss';
import Tags from './Tags';

const announces = [
    // '你能坚持的只有自己，能改变的也只有自己。✨',
    '水能载舟，亦可赛艇。🚤',
    '你不要过来啊！😱',
    '别慌，问题不大。🐳'
];
const announce = announces[(Math.random() * announces.length) | 0];

const PageBlock = ({ page, ...rest }: { page: PageData } & HTMLAttributes<HTMLDivElement>) => {
    const href = '/' + page.relativePath.replace(/.md$/, '.html');
    return (
        <div className='page-block' {...rest}>
            <div className='left'>
                <a href={href} className='cover'>
                    <img src={page.frontmatter.cover || '/post.jpg'} alt='cover' />
                </a>
            </div>
            <div className='right'>
                <a href={href} className='title'>
                    <h2>{page.title}</h2>
                </a>
                <p className='summary'>{page.frontmatter.summary}</p>
                <Tags page={page} />
                <BlogTime page={page} />
            </div>
        </div>
    );
};

const PageList = () => {
    const { pageList } = useData();
    const search = typeof location === 'undefined' ? '' : location.search;

    const tag = useMemo(() => {
        const queries = search
            .replace(/^\?/, '')
            .split('&')
            .map(piece => decodeURI(piece).split('='));
        const tag = queries.find(query => query[0] === 'tag')?.[1];
        return tag;
    }, [search]);

    const finalPageList = useMemo(() => {
        const finalPageList = pageList
            .map(page => ({
                ...page,
                frontmatter: { ...page.frontmatter }
            }))
            .filter(page => {
                let tags = page.frontmatter.tags;
                if (!tags?.length) {
                    tags = [];
                } else if (!Array.isArray(tags)) {
                    tags = tags.split(/[\s,]+/);
                }
                page.frontmatter.tags = tags;
                return (
                    !(tag !== '日记' && page.frontmatter.tags.includes('日记')) ||
                    (!page.frontmatter.list &&
                        !page.frontmatter.home &&
                        !page.relativePath.match(/^wip\//) &&
                        !page.relativePath.match(/^work\//) &&
                        !page.frontmatter.ignoreInList &&
                        (!tag || page.frontmatter.tags.includes(tag)))
                );
            })
            .sort((a, b) => getPageCreateTime(b) - getPageCreateTime(a));
        return finalPageList;
    }, [tag]);

    return (
        <main className={'list ' + cls.list}>
            <div className='container'>
                <div className='about-card'>
                    <img src='/avatar.webp' alt='avatar' className='avatar' />
                    <div className='introduce'>
                        👋 你好，我是<b>嘿嘿</b>，一名 👨🏻‍💻。
                    </div>
                    <div className='announce'>
                        {announce}
                        <span className='cursor'>|</span>
                    </div>
                    <ul className='social-media-list'>
                        <li>
                            <a href='https://github.com/ZxBing0066' target='_blank'>
                                <img src='/github.svg' alt='github' />
                            </a>
                        </li>
                        <li>
                            <a href='https://juejin.cn/user/219558054997710' target='_blank'>
                                <img src='/juejin.png' alt='juejin' />
                            </a>
                        </li>
                        <li className='popup'>
                            <a target='_blank'>
                                <img src='/weixin.png' alt='weixin' />
                            </a>
                            <div className='popover'>
                                <div className='arrow'></div>
                                <div className='content'>
                                    <img src='/weixin-qrcode.jpg' alt='' />
                                </div>
                            </div>
                        </li>
                        <li>
                            <a href='https://www.zhihu.com/people/ZxBing0066' target='_blank'>
                                <img src='/zhihu.svg' alt='zhihu' />
                            </a>
                        </li>
                        <li>
                            <a href='https://segmentfault.com/u/zxbing0066' target='_blank'>
                                <img src='/segmentfault.png' alt='segmentfault' />
                            </a>
                        </li>
                    </ul>
                </div>
                {tag && <h2 className='subtitle'>Tag: {tag}</h2>}
                <Content className='content' />
                <div className='list-wrap'>
                    {finalPageList.map((page, i) => (
                        <PageBlock
                            page={page}
                            key={page.relativePath}
                            style={{ animationDelay: 0.1 * Math.min(i, 15) + 's' }}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default PageList;
