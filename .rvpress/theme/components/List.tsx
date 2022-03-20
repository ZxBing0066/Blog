import React, { useMemo } from 'react';
import { Content, PageData, useData } from 'rvpress';

import cls from './List.module.scss';

const CreateTime = ({ date }: { date: number }) => {
    const s = useMemo(() => {
        const d = new Date(date);
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }, [date]);
    return <span className="create-time">{s}</span>;
};

const Tags = ({ tags }: { tags: string[] | string }) => {
    if (!tags?.length) return null;
    if (!Array.isArray(tags)) tags = tags.split(/[\s,]+/);
    return (
        <ul className="tags">
            {tags.map(tag => (
                <li className="tag" key={tag}>
                    {tag}
                </li>
            ))}
        </ul>
    );
};

const PageBlock = ({ page }: { page: PageData }) => {
    const href = '/' + page.relativePath.replace(/.md$/, '');
    return (
        <a href={href} className="page-block">
            <h2 className="title">{page.title}</h2>
            <Tags tags={page.frontmatter.tags} />
            <CreateTime date={page.createTime} />
        </a>
    );
};

const PageList = () => {
    const { pageList } = useData();

    const tag = useMemo(() => {
        const queries = location.search
            .replace(/^\?/, '')
            .split('&')
            .map(piece => piece.split('='));
        const tag = queries.find(query => query[0] === 'tag')?.[1];
        return tag;
    }, [location.search]);

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
                return !page.frontmatter.list && (!tag || page.frontmatter.tags.includes(tag));
            })
            .sort((a, b) => b.createTime - a.createTime);
        return finalPageList;
    }, [tag]);

    return (
        <main className={'list ' + cls.list}>
            <div className="container">
                <h1 className="main-title">Blog</h1>
                {tag && <h2 className="subtitle">Tag: {tag}</h2>}
                <Content className="content" />
                {finalPageList.map(page => (
                    <PageBlock page={page} key={page.relativePath} />
                ))}
            </div>
        </main>
    );
};

export default PageList;
