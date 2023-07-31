---
tags: [架构]
date: 2021-08-27
---

# 大型 SPA 项目架构设计与重构

> 本文主要为分享我司 [控制台](https://console.ucloud.cn/) 最近两年的架构演进，遇到的问题和解决方案等。控制台项目包含近百个不同产品，跨部门、跨地域协作开发，是一个比较典型的大型 SPA 前端项目。

先说下为何要做架构重构，老架构以及老架构下的一些问题。

## 老架构介绍

控制台老架构底层为 `angular@1`，使用 `angular` 的 `ui-router` 和 `lazy-load` 来进行项目的按需加载运行。大部分项目通过 `angular` 挂载 `react` 实例，虽然很多业务代码和 `angular` 无关，但是依然有很多地方（如 services、路由等）依赖 `angular`。

### 老架构存在的问题

老架构存在的问题主要分为两部分，运行时问题和开发时问题：

#### 运行时问题

##### 老架构严重依赖 angular

由于当初整套架构设计基于 `angular` 的能力，导致启动器体量大、加载慢、性能差。

##### 老架构下的依赖体量重

老架构下公共部分主要分为 `common` 和 `components`，里面存在大量的历史遗留、冗余、无效代码，历史包袱重，而且依赖混乱，无法安全清理。

##### 耦合严重

老架构下的项目，虽然大部分项目代码已经都是 `react` 代码，但是有一些 `services` 依然依赖 `angular`。启动器、公共依赖、项目间的代码耦合严重。

##### 性能问题

启动器重、依赖重、语言文件混合导致过大、初始化内容过多等各种问题导致项目加载慢、执行慢。

#### 开发时问题

##### 使用麻烦、风险高

老架构的项目结构为一个主项目和 N 个子项目，主项目中包含着开发脚本、开发依赖，其它的项目如依赖、启动器、项目均作为子模块（`git submodule`）管理。

开发时需要检查主仓库更新，检查依赖更新，执行开发脚本，还需注意启动器项目的版本、冲突、依赖更新等，使用成本高。

##### 升级成本高

开发环境无法安全升级，由于所以依赖、脚本都是全项目共享，升级会直接影响到上百个子项目，导致不能随意变动。

## 新架构

![架构图](https://stg.heyfe.org/images/blog-2021-console-architecture-84.png)

控制台项目分三层，启动器、公共模块、业务模块。

### 启动器

启动的承载着网站最基本的功能，包括：

-   骨架屏
-   浏览器兼容处理 - 不兼容版本提示
-   项目路由管理（`router-service`） - 跨项目跳转
-   项目加载/挂载/卸载（微前端 [rapiop](https://github.com/rapiop/rapiop)）
-   模块管理器（[mod](https://rapiop.github.io/mod/#/)）
-   主题 - 主题加载/切换
-   基础依赖 - `babel polyfill`、`reset-style`
-   `sentry` - 错误上报
-   `matomo` - 用户行为分析、数据上报
-   其它的一些内部服务等

### 公共模块

#### services

`services` 为内部的一些公共服务。

-   `user` - 用户信息
-   `intl` - 语言翻译
-   `das` - 数据上报
-   `region`、`project` 等

#### libs

`libs` 用于输出一些常用的公共模块、开源库。

-   `react`、`react-dom`、`react-router` - `react` 相关库
-   [components](https://ucloud-fe.github.io/react-components/) - 公共组件库
-   `apexcharts`、`react-apexcharts` - 图标库
-   `lodash` 等工具库

#### components

`components` 包括控制台相关的一些业务组件

-   `common-components` - 常用的业务组件、布局、路由组件等
-   `umon-components` - 监控相关组件
-   `code-components` - 代码编辑器组件
-   `ulog-components`、`pay-components` 等

#### 其它模块

-   `sidebar`、`navbar` - 公共部分的 UI
-   `styles` - 通用的样式
-   `react-adapter` - 项目适配器，减少样板代码（注册微前端、初始化语言、依赖加载等）

### 业务模块

业务模块主要为各业务项目，分为老项目、新项目。

### 优化后

-   轻量无依赖启动器
-   职责明确
-   模块拆分、[自治](https://rapiop.github.io/mod/#/background?id=%e6%a8%a1%e5%9d%97%e7%9a%84%e8%87%aa%e6%88%91%e7%ae%a1%e7%90%86)、依赖明确
-   无耦合

### 运行流程

进入页面：

-   浏览器兼容检测，`polyfill`、基本依赖加载
-   `reset` 样式加载，主题、`matomo`、`sentry` 初始化
-   灰度信息获取，未登陆则跳回登陆
-   使用灰度信息初始化微前端、模块管理器
-   根据当前 `url` 匹配项目，如果为老项目则加载老启动器，进入老项目加载流程，新项目直接加载项目、依赖

![流程图](https://stg.heyfe.org/images/blog-2021-console-architecture-49.png)

### 开发

开发环境拆分为两部分：`CLI` 和 `dev-dependences`。

#### CLI

提供 `CLI` 工具，提供开发、构建、打包分析、`codemod`、依赖管理等功能。

#### dev-dependences

包含了项目的开发依赖：`webpack`、`eslint`、`loaders` 等，存在多版本，可方便后续的升级迭代，降低升级成本和风险。

提供依赖对应的功能脚本：开发、构建等。

#### 开发启动

通过 `CLI` 启动开发命令，会根据命令启动启动器（线上/预发步/本地），启动指定项目中的开发依赖中的开发脚本并通信，合并线上灰度信息和本地文件信息。

#### 优势

-   升级维护安全
-   使用方便

## 现状

目前处于新架构老架构共存的状态，大部分的老项目在逐渐替换旧的 services 等，进行平滑升级。
