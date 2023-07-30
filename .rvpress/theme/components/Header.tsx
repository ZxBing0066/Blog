import React from 'react';
import { useData } from 'rvpress';

import { ThemeConfig } from '../ThemeConfig';
import cls from './Header.module.scss';
import useRootScroll from '../hooks/useRootScroll';
import HomeIcon from './icons/Home';

const Header = () => {
    const { site } = useData<ThemeConfig>();
    const rootScroll = useRootScroll();
    const fixed = rootScroll > 40;

    return (
        <header className={'header ' + cls.header + (fixed ? ' fixed' : '')}>
            <div className='wrap'>
                <a href={site.base}>
                    <img src='/logo.svg' className='logo' alt='logo' />
                </a>
                <a className='header-link' href='https://www.heyfe.org/' target='_blank'>
                    <HomeIcon />
                </a>
            </div>
        </header>
    );
};

export default React.memo(Header);
