import React from 'react';

import useTOC from '../hooks/useTOC';
import cls from './TOC.module.scss';

const TOC = () => {
    const toc = useTOC();

    return toc.length ? (
        <div className={'toc ' + cls.toc}>
            {toc.map(item => (
                <div key={item.slug} className={`title level-${item.level}`}>
                    <a href={`#${item.slug}`}>{item.title}</a>
                </div>
            ))}
        </div>
    ) : null;
};

export default React.memo(TOC);
