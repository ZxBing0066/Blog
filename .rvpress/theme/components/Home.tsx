import React, { memo } from 'react';

import List from './List';
import cls from './Home.module.scss';

const UserInfo = memo(() => {
    return (
        <div className='user-info'>
            <div>
                <img className='avatar' src='https://avatars.githubusercontent.com/u/5652404?s=100&v=4' alt='avatar' />
            </div>
            <div className='user-info__name'>
                <span>
                    <a href=''>
                        <span>
                            <strong></strong>
                        </span>
                    </a>
                </span>
            </div>
        </div>
    );
});

const Home = memo(function Home() {
    return (
        <div className={'home ' + cls['home']}>
            <List />
            <UserInfo />
        </div>
    );
});

export default Home;
