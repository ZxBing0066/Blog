import React, { useMemo } from 'react';
import { Content, PageData, useData } from 'rvpress';

import { getPageCreateTime } from '../utils';
import BlogTime from './BlogTime';
import cls from './List.module.scss';
import Tags from './Tags';

const PageBlock = ({ page }: { page: PageData }) => {
    const href = '/' + page.relativePath.replace(/.md$/, '.html');
    return (
        <div className='page-block'>
            {/* <div className='page-card'> */}
            <h2 className='title'>
                <a href={href}>{page.title}</a>
            </h2>
            <Tags page={page} />
            <BlogTime page={page} />
            {/* </div> */}
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
                console.log(page.relativePath);
                
                return (
                    !page.frontmatter.list &&
                    !page.frontmatter.home &&
                    !page.relativePath.match(/^wip\//) &&
                    !page.frontmatter.ignoreInList &&
                    (!tag || page.frontmatter.tags.includes(tag))
                );
            })
            .sort((a, b) => getPageCreateTime(b) - getPageCreateTime(a));
        return finalPageList;
    }, [tag]);

    return (
        <main className={'list ' + cls.list}>
            <div className='container'>
                <h1 className='main-title'>Blog</h1>
                <p className='main-description'>
                    一个前端程序员的博客 👨🏻‍💻 <span className='cursor'>|</span>
                </p>
                {/* <p></p> */}
                {tag && <h2 className='subtitle'>Tag: {tag}</h2>}
                <Content className='content' />
                <div className='list-wrap'>
                    {finalPageList.map(page => (
                        <PageBlock page={page} key={page.relativePath} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default PageList;
