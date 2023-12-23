import React, { useMemo } from 'react';
import { PageData } from 'rvpress';

import { getPageCreateTime, getPageUpdateTime } from '../utils';
import cls from './BlogTime.module.scss';

const BlogTime = ({ page }: { page: PageData }) => {
    const date = getPageCreateTime(page);
    const lastUpdated = getPageUpdateTime(page);

    const s = useMemo(() => {
        const d = new Date(date);
        const dStr = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
        if (lastUpdated) {
            const l = new Date(lastUpdated);
            const lStr = `${l.getFullYear()}年${l.getMonth() + 1}月${l.getDate()}日`;
            if (lStr === dStr) return dStr;
            return dStr + ' - ' + lStr;
        }
        return dStr;
    }, [date, lastUpdated]);
    return <span className={cls['blog-time'] + ' blog-time'}>{s}</span>;
};

export default React.memo(BlogTime);
