import React, { memo, useMemo } from 'react';
import { useData } from 'rvpress';

import { ThemeConfig, NavItem, NavItemWithLink, NavItemWithChildren } from '../ThemeConfig';
import cls from './Header.module.scss';
import Outbound from './icons/Outbound';
import Angle from './icons/Angle';
import useRootScroll from '../hooks/useRootScroll';

const RNavItem = memo(function RNavItem({ item }: { item: NavItem }) {
    if ('items' in item) {
        return <RNavMenu item={item} />;
    }
    return <RNavLink item={item} />;
});

const RNavLink = memo(function RNavLink({ item }: { item: NavItemWithLink }) {
    const isOutbound = useMemo(() => item.link.startsWith('http'), [item.link]);
    return (
        <a className="nav-link" href={item.link} rel={item.rel} aria-label={item.ariaLabel} target={item.target}>
            {item.text}
            {isOutbound && <Outbound />}
        </a>
    );
});

const RNavMenu = memo(function RNavMenu({ item }: { item: NavItemWithChildren }) {
    return (
        <div className="nav-menu">
            <a className="nav-link" aria-label={item.ariaLabel}>
                {item.text}
                <Angle className="angle-down" />
            </a>

            <ul className="menu-list">
                {item.items.map(item => (
                    <li key={item.text} className="menu-item">
                        <RNavMenuLink item={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
});

const RNavMenuLink = memo(function RNavMenuLink({ item }: { item: NavItemWithLink }) {
    return (
        <a href={item.link} rel={item.rel} aria-label={item.ariaLabel} target={item.target}>
            {item.text}
        </a>
    );
});

const Nav = memo(function Nav() {
    const { theme } = useData<ThemeConfig>();
    const { nav } = theme;
    if (!nav) return null;
    return (
        <ul className="nav">
            {nav.map((navItem, i) => (
                <li className="nav-item" key={i}>
                    <RNavItem item={navItem} />
                </li>
            ))}
        </ul>
    );
});

const Header = () => {
    const { theme, site } = useData<ThemeConfig>();
    const rootScroll = useRootScroll();
    const fixed = rootScroll > 40;

    return (
        <header className={'header ' + cls.header + (fixed ? ' fixed' : '')}>
            <div className="wrap">
                <a href={site.base}>{theme.logo && <span className="logo">{theme.logo}</span>}</a>
                <Nav />
            </div>
        </header>
    );
};

export default React.memo(Header);
