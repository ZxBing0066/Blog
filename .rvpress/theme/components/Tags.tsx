import React from 'react';
import { PageData } from 'rvpress';

import cls from './Tags.module.scss';

const Tags = ({ page }: { page: PageData }) => {
    let tags: string[] | string = page.frontmatter.tags;
    if (!tags?.length) return null;
    if (!Array.isArray(tags)) tags = tags.split(/[\s,]+/);
    return (
        <div className={'tags ' + cls.tags}>
            {tags.map(tag => (
                <a className='tag' key={tag} href={`/blog/?tag=${tag}`}>
                    {tag}
                </a>
            ))}
        </div>
    );
};

export default React.memo(Tags);
