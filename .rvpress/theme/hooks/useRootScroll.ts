import { useCallback, useEffect, useState } from 'react';

export default () => {
    const [scrollTop, setScrollTop] = useState(() => window.scrollY);
    const handleScroll = useCallback((e: Event) => {
        setScrollTop(window.scrollY);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return scrollTop;
};
