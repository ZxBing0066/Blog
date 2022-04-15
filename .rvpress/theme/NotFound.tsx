// Modified from https://codepen.io/diogo_ml_gomes/pen/PyWdLb

import React, { useCallback, useEffect } from 'react';
import { useData } from 'rvpress';

import cls from './NotFound.module.scss';

const NotFount = () => {
    const { site } = useData<{ base: string }>();
    const pageX = window.innerWidth;
    const pageY = window.innerHeight;

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

export default typeof window === 'undefined' ? () => null : React.memo(NotFount);
