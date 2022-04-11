import React from 'react';
import { Content, useData } from 'rvpress';

import cls from './Blog.module.scss';
import BlogTime from './BlogTime';
import Tags from './Tags';
import Toc from './Toc';

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
                    <Toc />
                </div>
            </div>
        </main>
    );
};

export default React.memo(Blog);
