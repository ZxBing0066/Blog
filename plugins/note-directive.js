/**
 * @import {} from 'mdast-util-directive'
 * @import {} from 'mdast-util-to-hast'
 */

import { visit } from 'unist-util-visit';

export function noteDirectiveRemarkPlugin() {
    return tree => {
        visit(tree, node => {
            if (node.type === 'containerDirective' || node.type === 'leafDirective' || node.type === 'textDirective') {
                if (node.name !== 'note' && node.name !== 'warning') return;

                const data = node.data || (node.data = {});
                const attributes = node.attributes || {};
                const directiveType = node.name;

                // 收集自定义类名
                let customClasses = [];

                // 处理标准 className 属性
                if (attributes.className) {
                    customClasses = Array.isArray(attributes.className) ? attributes.className : [attributes.className];
                    delete attributes.className;
                }

                // 设置基本属性
                if (node.type === 'containerDirective' || node.type === 'leafDirective') {
                    // 设置为 div 元素
                    data.hName = 'div';

                    // 设置类名
                    data.hProperties = {
                        className: [`directive-${directiveType}`, ...customClasses]
                    };

                    // 其他属性直接复制
                    for (const [key, value] of Object.entries(attributes)) {
                        if (key !== 'title') {
                            data.hProperties[key] = value;
                        }
                    }

                    // 对于有标题的情况，不修改 children，让原生的处理逻辑接管
                    if (attributes.title) {
                        data.hName = 'div';
                        data.hProperties = { className: [`directive-${directiveType}`, ...customClasses] };

                        // 在这里不设置 hChildren，而是添加新的标题节点作为第一个子节点
                        if (!node.children) {
                            node.children = [];
                        }

                        node.children.unshift({
                            type: 'html',
                            value: `<h4 class="directive-title">${attributes.title}</h4>`
                        });

                        delete attributes.title;
                    }
                } else if (node.type === 'textDirective') {
                    // 文本指令 - 更简单的处理
                    data.hName = 'mark';
                    data.hProperties = {
                        className:
                            directiveType === 'warning'
                                ? ['directive-warning-mark', ...customClasses]
                                : ['directive-mark', ...customClasses]
                    };
                }
            }
        });
    };
}
