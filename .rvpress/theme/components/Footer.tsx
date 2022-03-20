import React from 'react';

import cls from './Footer.module.scss';

export default React.memo(() => {
    return (
        <footer className={'footer ' + cls.footer}>
            <div className='container'>
                <div className='info'>
                    <p className='copyright'>
                        Copyright © 2021 by{' '}
                        <a href='https://github.com/ZxBing0066' target='_blank'>
                            ZxBing0066
                        </a>
                    </p>
                    <p className='powered'>
                        Powered by{' '}
                        <a href='https://github.com/ZxBing0066/rvpress' target='_blank'>
                            RVPress
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
});
