---
tags: [组件, 自动化]
---

# 为了降低维护成本（早点下班），我在组件开发中所做的那些优化（偷懒）

组件开发中为了稳定性、健壮性，经常需要为组件编写测试用例，然后还要为了开发者方便使用编写文档，都是非常耗时间的差事。

作为一个独立维护组件库的程序员，为了能够降低组件维护的成本（早点下班），我总结了一下自己过去几年为了让组件开发更加高效所做的那些事情（偷的那些懒）。

## 不写文档

为了能够让我不要在编写文档上浪费太多时间，我选择 `react-styleguidist` 作为组件库文档，他可以从组件代码的注释中、`React` 组件的 `props` 定义中自动生成文档数据。

所以每个组件的文档我只需要在组件的定义上写下组件的交互说明，并且注释中可以直接使用 `markdown` 语法。然后在组件的 `props` 定义中写上关于该 `props` 的说明，在 `react-styleguidist` 生成的页面中，便可以看到关于组件、`props` 的说明，省大功夫了。后续更新直接编辑注释即可，不用再关注文档同步的问题。

![picture 1](https://stg.heyfe.org/images/blog-component-work-auto-43.png)

至于组件的智能提示，直接将组件使用 `ts` 编写，打包时使用 `tsc` 打包 `declaration` 文件，`props` 定义和组件注释全都带上，一举多得，可真棒呀。

## 抽离 demo

然而文档中不止要有文字描述，还要有丰富的 `demo` 来表现组件的功能。

`react-styleguidist` 中的 `demo` 需要编写在 `markdown` 文件中，emmm 这不太好吧：

1. `markdown` 中的文件校验、提示功能不佳，降低 `demo` 编写的效率
2. `demo` 可以复用在测试用例中，这么写在 `markdown` 里还得从 `markdown` 中解析出来才能用，然而语法上还有些差别抽离出来还得做处理，太麻烦

所以我重写了 `react-styleguidist` 的 `Examples` 组件，增加了本地代码加载的功能：[代码地址](https://github.com/UCloud-FE/react-components/blob/af77b0686f083acf6f3387ca0bed763d38e83b8e/.styleguide/components/Examples.jsx#L24)

在 `markdown` 中，`code` 块指定 `codepath` 属性

````md
```js {"codepath": "rowDeletion.jsx"}

```
````

在 `Examples` 中，根据 `codepath` 加载相应的代码，完成 `Demo` 代码的复用。

而 `Demo` 中通过魔法注释，抹除在文档中会导致问题的代码：

```js
import React from 'react';

// demo start
const Demo = () => {
    return <div>Hello World</div>;
};
// demo end

export default Demo;
```

## 不写测试用例

在组件的测试用例中，经常会使用快照测试来做 UI 测试，一般会采用快照测试，而测试所需要的组件代码，可以直接使用上面从 `Demo` 中抽离出来的事例。然而每个组件都要对其编写测试用例，着实浪费宝贵的上班（摸鱼）时间。

对于这种重复逻辑的测试用例，我直接将代码抽离成公共的测试用例模版，然后在组件的 `test` 文件夹中创建测试用例引入就完事了，再也不用维护快照测试用例了。

在需要启用快照测试的组件目录下创建：`__test__` 文件夹，并在该文件夹中创建 `demo.test.js` 文件，写入如下代码：

```js
import demoTest from 'tests/shared/demoTest';

demoTest();
```

就能为该组件启用快照测试。当然我平时都是直接从别的组件目录下直接复制文件。

下面揭秘下 `demoTest` 中做了什么：

```js
const demoTest = (ignoreList = []) => {
    const componentsName = module.parent.filename.match(/\/src\/components\/(\w*)\/.*/)[1];
    const demoFiles = require.context(`../../src/components/${componentsName}/__demo__`, true, /.*.jsx$/).keys();

    demoFiles.forEach(file => {
        const demoName = file.match(/^.*\/([^/]*)\.jsx?$/)[1];
        if (ignoreList.includes(demoName)) return;
        test(`${componentsName} demo -- ${demoName}`, () => {
            const Demo = require(file).default;
            if (Demo.__ignore__test) return;
            const component = render(<Demo />);
            const tree = renderToJson(component);
            expect(tree).toMatchSnapshot();
        });
    });
};
```

在 `demoTest` 中，通过 `module.parent` 获取到调用 `demoTest` 的模块，然后从过 `require.context` 获取该模块所在组件下的所有 `demo`，对其进行快照测试。

从此以后，组件快照测试只需要在创建组件时，在 `__test__` 下复制一份 `demo.test.js`。剩下的什么都不用做了。

## 不做重复工作

然后看到上面，创建组件时还需要创建文件夹，复制代码，绝对忍不了，直接写个 [shell 脚本](https://github.com/UCloud-FE/react-components/blob/v1.5.9/scripts/add_component.sh)：

```sh
#! /bin/bash

component_name=$1
base_path="src/components/"
component_path="${base_path}${component_name}"

# make components dir
mkdir $component_path
mkdir "${component_path}/__tests__"
mkdir "${component_path}/__demo__"
mkdir "${component_path}/style"

# create components file
touch "${component_path}/index.jsx"
touch "${component_path}/${component_name}.jsx"
touch "${component_path}/${component_name}.md"
touch "${component_path}/style/index.js"
touch "${component_path}/__demo__/base.jsx"
touch "${component_path}/__tests__/demo.test.js"

# write default file content to components file
echo "import ${component_name} from './${component_name}';
export default ${component_name};
" > "${component_path}/index.jsx"

echo "import demoTest from 'tests/shared/demoTest';
demoTest();" > "${component_path}/__tests__/demo.test.js"

# 此处省略一大串代码
# add to document

npm run restart
```

创建组件时直接一段脚本，传入组件名，什么创建文件夹、创建文件、样板代码，就都省了。

## 不写重复代码

上面抽离 `demo` 代码已经展现了我们作为程序员坚决不写重复代码的决心，然而这还不够。在写组件 `demo` 时经常会需要重复的套用布局、重复逻辑，这绝对不科学，所以这些重复的代码我选择将其抽离成共享组件，为啥共享，因为 `demo` 要用，测试也要用。所以在文档和测试的 `setup` 中，将其引入为全局组件，这样重复的代码就可以往里丢了。

至于组件编写是的重复代码，`hoc`、`decorator`、`hooks` 全都用上，不得不说，`hooks` 复用是真的香。

## changelog

组件维护时还会遇到需要维护更新日志的地方，每次都要去翻找历史记录，编写历史，很是麻烦。所以这里直接通过接入 `commitizen`、`commitlint`，使用标准化的 `commit message`，这样在开发完成时，使用 `git-cz` 来触发 `commit` 提交，可以方便的自动化生产标准化 `commit` 信息，再也不用纠结 `commit` 怎么写。

在发布时，直接通过 `standard-version` 来自动生成 `changelog`，又节省一大段摸鱼时间，可喜可贺。

## 问题早知道

开发时还经常会遇到本地开发没问题了，然后编译报错了、构建报错了等各种问题，来回改着实伤时间。此时就需要在开发时做好保障。`eslint`、`prettier`、`stylelint`、`typescript` 全都用上，有问题早知道，大家都说好。

## 自动化

为了避免推送后出现问题，往往需要在推送前做好测试，然而。。。这么多组件的测试，不但耗时间，还会让电脑卡的令人发指，着实令人苦恼。所以我选择使用 `husky+lint-stage` 来解决困扰。

`husky` 能够让我们在 `commit` 后自动触发钩子，`lint-stage` 可以让我们更方便的编写钩子中要处理的事情。

```json
{
    "*.{js,jsx}": ["prettier --write", "git add", "eslint", "jest --bail --findRelatedTests --collectCoverage"],
    "*.{json,css,md}": ["prettier --write", "git add"]
}
```

通过上述配置，可以方便的将测试用例、格式化、校验等行为局限在被修改的文件范围，大大提高 `commit` 前的校验效率。至于全盘扫描，我则在 `CI/CD` 中做处理，慢则慢矣，咱只要等他邮件通知即可，电脑依旧可以用来快乐的摸鱼。

然而每次发布组件版本，都要做一大堆的准备，比如：

1. 执行测试、校验
2. 打包各种格式代码
3. 打包文档
4. 发布代码
5. 发布文档

麻烦就算了，还容易忘记。所以直接让 `CI/CD` 来搞定。通过 [circle CI 配置](https://github.com/UCloud-FE/react-components/blob/d0f488b5c287aada784203d19b2568fb95d7efdc/.circleci/config.yml#L2) ，解放双手，打包只需要执行一句 `npm run publish`，剩下的一切就是一边摸鱼一边等待邮件通知。（别问为啥不用 `GitHub action`，那会他还没出生。别问为啥现在不换成 GitHub action，对摸鱼毫无益处的改动咱不做。）
