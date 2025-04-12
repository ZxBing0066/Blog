---
title: React 组件文档套件设计
pubDate: '2022-08-17'
heroImage: 'https://stg.heyfe.org/images/blog-react-isr-demo-1690810719572.png'
tags:
    - React
---

# React 组件文档套件设计

在编写 `React UI` 组件时为了方便开发者使用组件，我们经常会使用文档系统来自动生成组件文档和定义文档。开源中比较出名的是 `storybook`，还有 `react-styleguidist`。

## 动机

然而某些情况下会遇到需要将文档系统嵌入到其它系统中的情况，如组件依赖于某些环境，则需要将文档系统嵌入到该环境中。为此，需要一个能够适用于各种环境的文档系统。

为此设计师将文档系统分为了 3 块（`compiler` 为凑数用 🤦‍♂️，其实可以不用拆出来，只是 fork 后还是保持了独立）：

-   文档生成器 `gen`：通过读取组件的定义，生成组件的注释、`props`、`method` 等文档，并整合组件的 `markdown` 文档
-   组件预览编辑 `live`：通过组件文档中的 `code`，生成组件的预览，并可实时编辑代码
-   运行时 `js` 转译器 `compiler`：为了能够将代码转换为组件，需要在运行时将代码进行编译才能执行
-   文档展示 `doc`：读取组件的定义文档、`markdown` 文档数据，解析 `markdown` 展示文档界面，并将 `code` 片段按照配置生成实时编辑块

## gen

`gen` 可通过 `cli` 调用：

```sh
npx recodo-gen build -p ./components/
```

`gen` 主要用于数据抓取，会使用 `react-docgen` 爬取组件定义，生成定义数据 `info.json`，包装这层主要是为了控制生成的数据结构，方便其它包使用。

除此之外，`gen` 还会读取源码中的 `markdown` 文件，生成 `doc.json` 文件。

所有组件生成数据会汇总在 `index.js` 中。

比如如下的组件定义：

```sh
components
└── Button
    ├── Button.tsx
    ├── README.md
    └── index.tsx
```

`Button.tsx`

```ts
import React, { ReactNode, HTMLAttributes } from 'react';

const Button = ({
    size,
    style,
    ...rest
}: {
    /** content */
    children: ReactNode;
    /** size of the button */
    size: 'sm' | 'md' | 'lg';
} & HTMLAttributes<HTMLButtonElement>) => {
    return <button {...rest} style={{ lineHeight: { sm: 24, md: 30, lg: 36 }[size] + 'px', ...style }} />;
};

export default Button;
```

执行 `gen build -p components` 生成的数据如下：

`index.js`

```js
const infoMap = { Button: require('./Button.info.json') };
const docMap = { Button: require('./Button.doc.json') };
module.exports = { infoMap, docMap };
```

`Button.doc.json`

```json
{ "README": { "path": "Button/README.md", "name": "README", "info": "" } }
```

`Button.info.json`

```json
{
    "Button": {
        "path": "Button/Button.tsx",
        "name": "Button",
        "info": {
            "description": "",
            "displayName": "Button",
            "methods": [],
            "props": {
                "children": {
                    "required": true,
                    "tsType": { "name": "ReactNode" },
                    "description": { "description": "content", "tags": [] }
                },
                "size": {
                    "required": true,
                    "tsType": {
                        "name": "union",
                        "raw": "'sm' | 'md' | 'lg'",
                        "elements": [
                            { "name": "literal", "value": "'sm'" },
                            { "name": "literal", "value": "'md'" },
                            { "name": "literal", "value": "'lg'" }
                        ]
                    },
                    "description": { "description": "size of the button", "tags": [] }
                }
            }
        }
    }
}
```

此外还包含以下参数：

| 参数 | 说明 | 格式 |
| --- | --- | --- |
| --help | Show help | [boolean] |
| --version | Show version number | [boolean] |
| -p, --componentPath | Path for find components | [string] [required] |
| -t, --targetPath | Path for place build files | [string] [default: "recodo-gen-output"] |
| -b, --babelrc | Path for custom babelrc file | [string] |
| -c, --componentRegExp | RegExp for match component file | [string] [default: "^[^/\\]+(\/\|\\)[A-Z][a-za-z_-]\*.(j\|t)s(x)?$"] |
| -d, --docRegExp | RegExp for match doc file | [string] [default: "^[^/\\]+(\/\|\\)[A-Z][a-za-z_-]\*.md(x)?$"] |
| -r, --resolver | Choose type of resolver | [string] [choices] "findExportedComponentDefinition", "findAllComponentDefinitions", "findAllExportedComponentDefinitions" |

除了 `build` 外还提供了 `watch` 命令，用于监听源码变化，自动生成文档数据。

此外还可使用 `node` 直接引入调用，方便融入其它工具中：

```js
const path = require('path');
const recodoGen = require('@ucloud-fe/recodo-gen');

module.exports = ({ cachePath, rootPath, callback }) => {
    recodoGen
        .build({
            componentPath: rootPath,
            targetPath: cachePath,
            babelrc: path.resolve(__dirname, '../config/.babelrc.js'),
            callback: callback
        })
        .catch(err => {
            console.error(err);
        });
};
```

## compiler

`compiler` 用于在运行时转移源码，主要用于实时预览 `React` 组件。源码从 `buble fork` 而来，没直接使用的原因是 `buble` 不支持 `import`，所以 `fork` 后自行增加了 `import`、`export` 的支持。

如下代码：

```js
import React from 'react';

const Hello = () => {
    return <div>Hello world</div>;
};

export default Hello;
```

通过 `compiler` 的 `transform` 会被转译为：

```js
var React = require('react').__esModule ? require('react').default : require('react');

var Hello = function () {
    return React.createElement('div', null, 'Hello world');
};

module.exports = Hello;
```

从而能够直接在浏览器运行。

## live

`live` 设计和之前说的 `react-live` 一致，都是为了实现实时编辑预览组件效果。没有直接使用的原因是 `react-live` 不支持 `import`，并且支持的语法写出来和自己想象的单文件代码相差较远，所以照着 `react-live` 的设计重新使用 `ts` 实现了一遍。

`live` 内部使用 `compiler` 来做运行时转移，原理基本等同 `react-live`，不了解的可以看之前写的关于 `react-live` 的源码解析。

## doc

`doc` 主要作用是渲染 `gen` 所生成的文档数据，会将 `props` 定义渲染为表格、文档 `markdown` 解析渲染、`markdown` 中的代码块通过 `react-live` 渲染为实时预览编辑器。
