---
title: 玩转 GitHub Actions
pubDate: '2022-08-23'
tags: []
---

GitHub Actions 是 GitHub 中提供的自动化功能，通过它可以方便的在你提交代码、发送 PR 等各种事件触发时触发一系列自动化操作，完成 CI/CD、辅助机器人等功能，解放双手。

并且不止于此，Actions 还能在 issue、discussion 等几乎所有 GitHub 的功能的事件触发时触发。要看支持他具体支持的事件有哪些可以看下[官方文档](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#available-events)。

在 Actions 出现前，GitHub 中的开源项目一般会选择使用 travis-ci、circle-ci 等工具来实现 CI/CD，而现在基本大部分新创建的开源项目都会使用 Actions 来完成。（为 circle-ci 默哀）

Actions 对开源项目全部免费，并且私有仓库也有一定的免费时长，对于开源开发者来讲，简直香的不行。

## 使用

首先想要在仓库中使用 Actions 需要在 .github/workflows/ 中创建相应的 {workflow}.yml 文件。（如果你的仓库启用了 pages，会存在一个隐藏的 pages workflow）

### 触发

创建 workflow 文件后，你需要为你的 workflow 指定一个或多个触发条件。Actions 的触发除了上面提到的通过各种事件来触发外，还包括定时触发、主动触发和间接触发。

#### 事件触发

事件触发通过声明事件类型来表明触发时机，常见的场景如下：

在新版本 push 后通过 tag 触发：

```yml
on:
    push:
        tags:
            - 'v*'
```

push 或发送 PR 至 main 时触发：

```yml
on:
    push:
        branches: [main]
    pull_request:
        branches: [main]
```

在 PR 创建或重新打开时触发：

```yml
on:
    pull_request:
        types: [opened, reopened]
```

还有一类比较特殊的：

```yml
on:
    workflow_run:
        workflows: [Build]
        types: [completed]
```

可以通过某个 workflow 的运行状态来触发另一个 workflow。默认情况下 Actions 中的 workflow 都是对等的，相互之间没有关联，如果你的 workflow 间有编排需求，则可以借助这类事件来处理。

#### 定时触发

定时触发使用 crontab 定时任务来描述 workflow 触发的时间点。

```yml
on:
    schedule:
        # * is a special character in YAML so you have to quote this string
        - cron: '30 5,17 * * *'
```

定义后到定义的时间 workflow 便会开始执行，不过要注意一般会有几分钟的延时，执行时间不会很精确，不能依赖。

这种类型的 workflow 一般会用在一些定时任务（每日报告汇总、数据采集、签到脚本（误））上，或者一些大型项目会每周汇总自动发版等。

#### 主动触发

主动触发即通过 Actions 界面中的按钮、API 接口等来触发 workflow 的运行，一般在测试或和其它系统集成时使用。

#### 间接触发

间接触发指的是 workflow 被其它 workflow 引用时，在其它 workflow 中启动的情况，不在常用范围内，下面会单独说明。

### 任务

除了触发条件，最重要的就是定义任务，workflow 中通过 jobs 字段来定义对应的任务：

```yml
jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: actions/setup-node@v2
              with:
                  node-version: 12
            - run: npm install
            - run: npm run test:ci

    publish-npm:
        needs: build
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: actions/setup-node@v2
              with:
                  node-version: 12
                  registry-url: https://registry.npmjs.org/
            - run: npm install
            - run: npm run ci
            - run: npm publish
              env:
                  NODE_AUTH_TOKEN: ${{secrets.npm_token}}
```

注意，任务本身没有先后顺序，如果你的任务间存在前后依赖关系，需要使用 needs 来定义。

任务的 key 即任务名称，也可通过任务中的 name 字段来定义，会在 workflow 运行图中进行展示。

![picture 2](https://stg.heyfe.org/images/blog-github-actions-83.png)

此外一个任务一般至少包含两个字段：

-   runs-on： 表示任务的执行环境，除了常见的各种 linux 版本外，Actions 中还支持 macOS 和 Windows
-   steps： 表明任务要如何执行
    -   uses： 使用市场上发布的 actions
        -   with： 传递参数给使用的 action
    -   run： 执行脚本命令

所以这里一起来解释下上面的那段 jobs 定义，这是一段很常见的自动化测试并发布的任务定义：

-   定义了两个任务：build 和 publish-npm
-   publish-npm 依赖于 build 任务，所以会在 build 任务后执行
-   build 任务在 ubuntu-latest 镜像上运行，运行包括 4 步：
    1. 通过 actions/checkout 检出仓库代码
    2. 通过 actions/setup-node 安装配置 node 环境，版本为 node 12
    3. 执行 npm install
    4. 执行 npm run test:ci
-   build 任务完成后 publish-npm 任务开始启动，同样在 ubuntu-latest 镜像上运行，运行包括 5 步
    1. 通过 actions/checkout 检出仓库代码
    2. 通过 actions/setup-node 安装配置 node 环境，版本为 node 12，设定 registry-url
    3. 执行 npm install
    4. 执行 npm run ci
    5. 执行 npm publish，使用项目配置的 npm_token key 来发布

此外任务中还可以定义以下常见属性：

-   env： 定义环境变量
-   shell： 指定命令执行的 shell
-   timeout-minutes： 定义任务超时时长
-   permissions： 定义任务的权限
-   matrix： 定义任务执行的策略矩阵，比如定义了 `version: [10, 12, 14]` 和 `os: [ubuntu-latest, windows-latest]` 则会组合成 6 种执行环境分别执行任务

还有很多的属性。如果想要具体研究可以看下[官方文档](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobs)

### 名称

workflow 的名称默认为文件名，也可通过 name 字段定义，一般直接定义在首行：

```yml
name: my-first-workflow
```

名称会展示在 Actions 面板的任务列表中：

![picture 1](https://stg.heyfe.org/images/blog-github-actions-93.png)

## 复用

workflow 除了可以使用官方市场提供的 Actions 外，还可直接复用自己仓库中的 workflow 文件。

首先需要定义一个可复用的 workflow 文件，该文件主要的特点是支持通过 workflow_call 来触发，即上面讲到的间接调用。

```yml
on:
    workflow_call:
        inputs:
            username:
                required: true
                type: string
        secrets:
            envPAT:
                required: true
```

workflow_call 中还可定义 inputs 和 secrets 来定义参数或敏感的 token 类参数。

在需要使用的 workflow 文件中，则通过 uses 该通用 workflow 的文件路径进行调用：

```yml
jobs:
    reusable_workflow_job:
        runs-on: ubuntu-latest
        environment: production
        steps:
            - uses: ./.github/workflows/my-action
              with:
                  username: ${{ inputs.username }}
                  token: ${{ secrets.envPAT }}
```

通过 with 将参数进行传递。

### 其它

除了上面的内容外，workflow 中还可以定义权限、环境变量等，这里就不一一细说。