const tag = document.createElement('script');

tag.src = 'https://giscus.app/client.js';
tag.crossOrigin = 'anonymous';
tag.async = true;

const attributes = {
    'data-repo': 'ZxBing0066/Blog',
    'data-repo-id': 'MDEwOlJlcG9zaXRvcnkyMzg2Nzc5OA==',
    'data-category': 'Q&A',
    'data-category-id': 'DIC_kwDOAWwxls4CUI_l',
    'data-mapping': 'pathname',
    'data-strict': '0',
    'data-reactions-enabled': '1',
    'data-emit-metadata': '0',
    'data-input-position': 'bottom',
    'data-theme': 'preferred_color_scheme',
    'data-lang': 'zh-CN'
};

for (const key in attributes) {
    if (Object.prototype.hasOwnProperty.call(attributes, key)) {
        const value = attributes[key as keyof typeof attributes];
        tag.setAttribute(key, value);
    }
}

document.head.appendChild(tag);
