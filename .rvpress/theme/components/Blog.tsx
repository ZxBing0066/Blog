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
                        <div className='cover'>
                            <img src={page.frontmatter.cover || '/post.jpg'} alt='cover' />
                        </div>
                        <script
                            async
                            src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1906392499705020'
                            crossOrigin='anonymous'
                        ></script>
                        <ins
                            className='adsbygoogle'
                            style={{ display: 'block' }}
                            data-ad-client='ca-pub-1906392499705020'
                            data-ad-slot='3304980199'
                            data-ad-format='auto'
                            data-full-width-responsive='true'
                        ></ins>
                        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                        <div className='meta'>
                            <BlogTime page={page} />
                            <Tags page={page} />
                        </div>
                        <div className='line'></div>
                        <Content className='content' />
                    </div>
                    <div>
                        <script
                            async
                            src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1906392499705020'
                            crossOrigin='anonymous'
                        ></script>
                        <ins
                            className='adsbygoogle'
                            style={{ display: 'block' }}
                            data-ad-format='autorelaxed'
                            data-ad-client='ca-pub-1906392499705020'
                            data-ad-slot='1377748580'
                        ></ins>
                        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                        <TOC />
                    </div>
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
