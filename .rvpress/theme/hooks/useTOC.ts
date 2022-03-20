import { useMemo } from 'react';
import { useData } from 'rvpress';

export default function useTOC() {
    const { page, frontmatter } = useData();

    const toc = useMemo(() => {
        const headers = page.headers || [];
        const sidebarDepth = frontmatter.tocDepth || 3;
        const toc = headers.filter(header => header.level <= sidebarDepth);
        return toc;
    }, [page, frontmatter]);

    return toc;
}
