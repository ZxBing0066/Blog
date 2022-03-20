import React from 'react';
import { Content } from 'rvpress';

import cls from './Blog.module.scss';
import Toc from './Toc';

const Blog = () => {
    // const { page } = useData();
    return (
        <main className={'blog ' + cls.blog}>
            <div className="container">
                <div className="reading-area">
                    <Content className="content" />
                    <Toc />
                </div>
                {/* <NextAndPrevLinks /> */}
            </div>
        </main>
    );
};

export default React.memo(Blog);
