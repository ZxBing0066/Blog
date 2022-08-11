# 写个开源 React 组件库需要知道些什么

主要部分分为：

1. 组件编写相关
2. 文档相关
3. 测试相关
4. 工程化相关
5. 开源相关
6. 其它相关

## 组件编写

这部分主要分为技术选型和编写要点。

技术选型包括：

样式编写选型：

-   css in js
-   js in css
-   css modules

JS 编写选型：

-   js
-   ts
-   flow
-   各种 script

组件编写要点包括

-   受控非受控
-   memo 组件
-   API 定义最重要
    -   命名规范
    -   不要开放太多接口
-   性能
-   代码质量
-   代码复用方式

    -   mixin
    -   hoc
    -   decorator
    -   hooks

-   post css

## 文档相关

文档库

-   react-styleguidist
-   storybook
-   自研

## 构建相关

-   webpack/rollup
-   babel

## 开源相关

GitHub

-   pages
-   pr
-   issue
-   contribution guide

-   npm

    -   files
    -   scripts
    -   deps
    -   license

-   协议

## 测试相关

-   jest
-   react-testing-library
-   enzyme
-   @testing-library
-   快照测试
-   像素测试
-   覆盖率

## 文档相关

-   展示
    -   动机/使用场景
    -   功能
    -   属性、方法
    -   交互化 demo
    -   使用案例
-   实时编辑
-   目录

## 工程化相关

### ci/cd

-   GitHub action
-   circle ci
-   travis ci

### 其它

-   eslint
-   prettier
-   stylelint
-   husky
-   lint-staged
-   changelog
