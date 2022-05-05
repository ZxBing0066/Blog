import React, { Suspense } from 'react';
import { Content, useData } from 'rvpress';
// import { DiscussionEmbed } from 'disqus-react';

import cls from './Blog.module.scss';
import BlogTime from './BlogTime';
import Tags from './Tags';
import TOC from './TOC';

const DiscussionEmbed = React.lazy(async () => ({ default: (await import('disqus-react')).DiscussionEmbed }));

const Blog = () => {
    const { page } = useData();
    return (
        <main className={'blog ' + cls.blog}>
            <div className='container'>
                <div className='reading-area'>
                    <div className='content-wrap'>
                        <div className='meta'>
                            <BlogTime page={page} />
                            <Tags page={page} />
                        </div>
                        <Content className='content' />
                    </div>
                    <TOC />
                </div>
            </div>
            <Suspense fallback={null}>
                <DiscussionEmbed
                    shortname='zxbing0066-blog'
                    config={{
                        url: 'https://blog.heyfe.org' + location.pathname,
                        identifier: location.pathname
                            .replace(/^\//, '')
                            .replace(/\.html$/, '')
                            .replace(/\//g, '--'),
                        title: page.title,
                        language: 'zh_CN'
                    }}
                />
            </Suspense>
        </main>
    );
};

export default React.memo(Blog);
