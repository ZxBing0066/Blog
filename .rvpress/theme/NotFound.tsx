// Modified from https://codepen.io/diogo_ml_gomes/pen/PyWdLb

import React, { useCallback, useEffect, useMemo } from 'react';
import { useData, useRouter } from 'rvpress';

import cls from './NotFound.module.scss';

const NotFount = () => {
    const { site } = useData<{ base: string }>();
    const pageX = window.innerWidth;
    const pageY = window.innerHeight;
    const router = useRouter();

    const handleMove = useCallback((event: MouseEvent) => {
        const mouseY = event.pageY;
        const yAxis = ((pageY / 2 - mouseY) / pageY) * 300;
        const mouseX = event.pageX / -pageX;
        const xAxis = -mouseX * 100 - 100;

        const eyes = document.querySelector('[data-ghost-eyes]') as HTMLSpanElement;

        if (eyes) {
            eyes.style.transform = 'translate(' + xAxis + '%,' + -yAxis + '%)';
        }
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMove);
        return () => {
            window.removeEventListener('mousemove', handleMove);
        };
    }, []);

    useMemo(() => {
        const pathname = location.pathname;
        RedirectMap.forEach(info => {
            if (info.url === pathname) router.go(info.target);
        });
    }, [location.pathname]);

    return (
        <div className={'not-found ' + cls['not-found']}>
            <h1 className='tip'>404</h1>

            <div className='ghost-box'>
                <div className='symbol'></div>
                <div className='symbol'></div>
                <div className='symbol'></div>
                <div className='symbol'></div>
                <div className='symbol'></div>
                <div className='symbol'></div>

                <div className='ghost'>
                    <div className='ghost-eyes' data-ghost-eyes>
                        <div className='eye-left'></div>
                        <div className='eye-right'></div>
                    </div>
                    <div className='ghost-footer'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className='ghost-shadow'></div>
            </div>

            <a className='home-link' href={site.base} aria-label='go to home'>
                Go Home
            </a>
        </div>
    );
};

export default React.memo(NotFount);

const RedirectMap = [
    { url: '/javascript/2016/09/12/rxjs.html', target: '/blog/2016-09-12-rxjs.html' },
    { url: '/design-patterns/2016/09/12/observer-pattern.html', target: '/blog/2016-09-12-observer-pattern.html' },
    { url: '/terminal/2016/08/27/tmux-config.html', target: '/blog/2016-08-27-tmux-config.html' },
    { url: '/javascript/2016/08/26/strict-mode.html', target: '/blog/2016-08-26-strict-mode.html' },
    { url: '/terminal/2016/08/26/tmuxinator.html', target: '/blog/2016-08-26-tmuxinator.html' },
    { url: '/terminal/2016/08/15/tmux.html', target: '/blog/2016-08-15-tmux.html' },
    { url: '/shell/2016/08/14/shell-scripting.html', target: '/blog/2016-08-14-shell-scripting.html' },
    { url: '/tools/2015/06/30/weinre.html', target: '/blog/2015-06-30-weinre.html' },
    { url: '/weixin/2015/06/30/weixin-album-weixin.html', target: '/blog/2015-06-30-weixin-album-weixin.html' },
    { url: '/weixin/2015/06/29/weixin-album-image.html', target: '/blog/2015-06-29-weixin-album-image.html' },
    { url: '/nodejs/2014/12/17/nodejs-simple-server.html', target: '/blog/2014-12-17-nodejs-simple-server.html' },
    { url: '/proxy/2014/12/06/goagent.html', target: '/blog/2014-12-06-goagent.html' },
    { url: '/proxy/2014/12/06/shadowsocks.html', target: '/blog/2014-12-06-shadowsocks.html' },
    { url: '/git/2014/11/12/git-ssh-key.html', target: '/blog/2014-11-12-git-ssh-key.html' },
    { url: '/jekyll/2014/11/12/disqus.html', target: '/blog/2014-11-12-disqus.html' },
    { url: '/sublimetext/2014/11/08/gist.html', target: '/blog/2014-11-08-gist.html' },
    { url: '/sublimetext/2014/11/07/plaintasks-start.html', target: '/blog/2014-11-07-plaintasks-start.html' },
    { url: '/sublimetext/2014/11/07/sublime-text-3.html', target: '/blog/2014-11-07-sublime-text-3.html' },
    { url: '/life/2014/09/19/whine.html', target: '/blog/2014-09-19-whine.html' },
    { url: '/jekyll/2014/09/12/how-to-use-jekyll.html', target: '/blog/2014-09-12-how-to-use-jekyll.html' },
    { url: '/git/2014/09/11/git.html', target: '/blog/2014-09-11-git.html' }
];
