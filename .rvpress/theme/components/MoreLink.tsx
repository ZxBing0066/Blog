import React, { AnchorHTMLAttributes } from 'react';

import cls from './MoreLink.module.scss';

const MoreLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    return (
        <span className={'more-link ' + cls['more-link']} {...props}>
            {/* <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
            </span> */}
            <span className="text">Read more</span>
        </span>
    );
};

export default MoreLink;
