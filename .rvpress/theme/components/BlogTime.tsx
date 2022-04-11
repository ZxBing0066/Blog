import React, { useMemo } from 'react';
import { PageData } from 'rvpress';

import { getPageCreateTime } from '../utils';
import cls from './BlogTime.module.scss';

const CreateTime = ({ page }: { page: PageData }) => {
    const date = getPageCreateTime(page);
    const s = useMemo(() => {
        const d = new Date(date);
        return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    }, [date]);
    return <span className={cls['create-time'] + ' create-time'}>{s}</span>;
};

export default React.memo(CreateTime);
