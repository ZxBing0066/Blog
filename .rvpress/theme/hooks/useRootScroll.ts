import { useCallback, useEffect, useState } from 'react';

// for client only
export default typeof window === 'undefined'
    ? () => {
          return 0;
      }
    : () => {
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
