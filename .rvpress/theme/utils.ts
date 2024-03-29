import { PageData } from 'rvpress';

interface ObjectClassnames {
    [className: string]: boolean | string | 1 | 0;
}

export const classnames = (...names: (ObjectClassnames | string | boolean | number)[]) => {
    const resolve = (define: ObjectClassnames | string | boolean | number) => {
        let classNameArray: string[] = [];
        if (Array.isArray(define)) {
            define.map(resolve);
        } else if (typeof define === 'string') {
            classNameArray.push(define);
        } else if (typeof define === 'boolean' || typeof define === 'number') {
        } else {
            for (const className in define) {
                if (define[className]) classNameArray.push(className);
            }
        }
        return classNameArray.join(' ');
    };

    return names.map(resolve).join(' ');
};

export const getPageCreateTime = (page: PageData) => {
    return page.frontmatter.date ? +new Date(page.frontmatter.date) : page.createTime || +new Date();
};

export const getPageUpdateTime = (page: PageData) => {
    return (
        page.frontmatter.lastUpdate ||
        (page.lastUpdated && page.lastUpdated !== getPageCreateTime(page) ? page.lastUpdated : null)
    );
};
