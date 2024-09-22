---
lastUpdate: 2022-8-6
date: 2022-7-24
tags: [Troubleshooter, github]
---

# 关于在 GitHub Action 中无法获取 Git 历史的问题

前不久在 RVPress 中添加了自动获取文章创建和修改时间的功能，其中使用 `git log` 来获取文章文件的 history，而后发现该功能在 GitHub Action 中无法正常工作。这里记录一下 📝。

## 测试

先尝试找下问题，创建一个测试用的 action，查看是否可以正常获取 history：

```yml
name: test-history

on:
    push:
        branches: ['master']
    pull_request:
        branches: ['master']

jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            - name: Run log
              run: git log
```

然后查看是否可以正常获取 history：

```
Run git log
commit c8122bbd1b30de53610bd95bf31fe2f0f4439172
Author: ZxBing0066 <ZxBing0066@gmail.com>
Date:   Sun Jul 24 15:27:51 2022 +0800
    Update test-history.yml
```

执行日志可以看这里：[git log](https://github.com/ZxBing0066/playground-public/runs/7486425022?check_suite_focus=true)。

然而发现只有本次的 commit 信息，没有之前的 commit 信息，确定是 GitHub Action 导致的问题。

## 解决方案

在 GitHub Action 中使用 checkout 检出代码时，添加 fetch-depth: 0 参数即可。

```yml
name: test-history

on:
    push:
        branches: ['master']
    pull_request:
        branches: ['master']

jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
              with:
                  fetch-depth: 0
            - name: Run log
              run: git log
```

修改后的执行日志可以看这里：[git log](https://github.com/ZxBing0066/playground-public/runs/7486425026?check_suite_focus=true)。

## 原因

一般我们在 action 中都会先使用 checkout 来检出代码，然后进行操作，`checkout action` 在检出代码时默认只检出当前事件触发的 commit，而不是所有的 commit，从而导致 history 的丢失。参考 checkout 中的 fetch-depth 说明，如果没有指定 fetch-depth，默认为 1，即只检出最近的一次 commit（参考 git clone --depth 参数）。

```yml
# Number of commits to fetch. 0 indicates all history for all branches and tags.
# Default: 1
fetch-depth: ''
```

其实该参数就是 git clone 中的 depth 参数，可以看下 git 中关于该参数的说明：

> Create a *shallow* clone with a history truncated to the specified number of commits. Implies `--single-branch` unless `--no-single-branch` is given to fetch the histories near the tips of all branches. If you want to clone submodules shallowly, also pass `--shallow-submodules`.

简单理解说就是浅 clone 指定数量的 commit，主要是为了用来减轻服务器压力的，因为一般在 CI/CD 中无需关注历史记录，只需要关注最新的状态即可，所以默认都是只浅 clone 最近的一次 commit。有兴趣的同学可以尝试下使用 --depth 参数来 clone 一些比较流行的开源库，如 React、babel 等，可以明显感觉到差距。

## 相关问题

除了上面说的历史记录丢失的问题外，在 pull request 中还存在另一个问题：log 中最近的一条记录为一条不存在的 commit，类似 `xxx Merge xxx into xxx`，原因是 pull request 中会创建一个新的 merge commit，如果需要 head branch 的 log，可以添加 ref 参数：

```yml
- uses: actions/checkout@v3
  with:
      ref: ${{ github.event.pull_request.head.sha }}
      fetch-depth: 0
```

## 参考资料

-   https://github.com/actions/checkout
-   https://stackoverflow.com/questions/62334460/git-history-in-a-github-action

## 相关关键字

-   GitHub Action
-   git log not working
-   git history not working
-   pull request create a new history log
-   GitHub Action 中历史记录丢失
