import { visit } from 'unist-util-visit';

export default function rehypeWrapImages() {
    return tree => {
        visit(tree, 'element', (node, index, parent) => {
            if (node.tagName === 'img' && parent?.type === 'element') {
                const imageUrl = node.properties.src;

                const wrapper = {
                    type: 'element',
                    tagName: 'a',
                    properties: {
                        href: imageUrl,
                        className: ['gallery-item'],
                        'data-pswp-group': 'article-content-images'
                    },
                    children: [node]
                };

                parent.children[index] = wrapper;
            }
        });
    };
}
