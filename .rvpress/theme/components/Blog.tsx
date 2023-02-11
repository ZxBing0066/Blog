import React, { Suspense } from 'react';
import { Content, useData } from 'rvpress';
// import { DiscussionEmbed } from 'disqus-react';

import cls from './Blog.module.scss';
import BlogTime from './BlogTime';
import Tags from './Tags';
import TOC from './TOC';

const Giscus = React.lazy(() => import('@giscus/react'));

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
            {typeof location === 'undefined' ? null : (
                <Suspense fallback={null}>
                    <Giscus
                        id='comments'
                        repo='ZxBing0066/Blog'
                        repoId='MDEwOlJlcG9zaXRvcnkyMzg2Nzc5OA=='
                        category='Q&A'
                        categoryId='DIC_kwDOAWwxls4CUI_l'
                        mapping='pathname'
                        strict='0'
                        reactionsEnabled='1'
                        emitMetadata='0'
                        inputPosition='bottom'
                        // theme='preferred_color_scheme'
                        theme='light'
                        lang='zh-CN'
                    />
                </Suspense>
            )}
        </main>
    );
};

export default React.memo(Blog);
