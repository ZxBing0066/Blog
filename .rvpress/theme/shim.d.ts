// this module's typing is broken
declare module '@docsearch/js' {
    function docsearch<T = any>(props: T): void;
    export default docsearch;
}

declare module '@docsearch/css' {
    const css: string;
    export default css;
}

declare namespace JSX {
    interface IntrinsicElements {
        'css-doodle': {
            'click-to-update'?: boolean;
            children: string;
        };
    }
}
