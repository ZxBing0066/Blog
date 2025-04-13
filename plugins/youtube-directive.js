/**
 * @import {} from 'mdast-util-directive'
 * @import {} from 'mdast-util-to-hast'
 * @import {Root} from 'mdast'
 * @import {VFile} from 'vfile'
 */

import { visit } from 'unist-util-visit';

// This plugin is an example to turn `::youtube` into iframes.
export function youtubeDirectiveRemarkPlugin() {
    /**
     * @param {Root} tree
     *   Tree.
     * @param {VFile} file
     *   File.
     * @returns {undefined}
     *   Nothing.
     */
    return (tree, file) => {
        visit(tree, function (node) {
            if (node.type === 'containerDirective' || node.type === 'leafDirective' || node.type === 'textDirective') {
                if (node.name !== 'youtube') return;

                const data = node.data || (node.data = {});
                const attributes = node.attributes || {};

                // 获取 ID - 支持多种格式
                // 1. 直接使用 id 属性: ::youtube{id=xxx}
                // 2. 使用选择器格式: ::youtube{#xxx}
                let id = attributes.id;

                if (node.type === 'textDirective') {
                    file.fail('Unexpected `:youtube` text directive, use two colons for a leaf directive', node);
                }

                if (!id) {
                    file.fail(
                        'Unexpected missing `id` on `youtube` directive. Use either {id=xxx} or {#xxx} format.',
                        node
                    );
                }

                data.hName = 'iframe';
                data.hProperties = {
                    src: 'https://www.youtube.com/embed/' + id,
                    width: 560,
                    height: 315,
                    frameBorder: 0,
                    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
                    allowFullScreen: true,
                    title: node.children && node.children.length > 0 ? 'YouTube video' : 'YouTube video'
                };
            }
        });
    };
}
