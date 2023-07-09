---
tags: [eslint, 团队]
date: 2019-11-18
---

# 如何方便的为团队所有项目统一 ESLint 配置

## 前言

近期给团队项目 CLI 做重构，其中涉及到 ESLint 的部分，这部分之前的方式是通过开发和编译时调用 ESLint 的 CLI 去检查项目代码，虽然不会出什么问题，但是各种 IDE 的提示就废掉了，所以打算换一种比较通用的方式。

## 统一配置处理

为了统一配置，配置自然是不能直接暴露给开发者的，不然很容易被各种魔改就废了，所以需要将配置包装起来。

### ESLint extends

ESlint 中支持 extends 属性，用于在现有配置中扩展上一些其它的通用的配置。主要支持以下几种传值：

-   预置的通用配置：eslint:recommended、eslint:all
    > 实际配置文件在 eslint/conf 中可以找到
-   配置文件地址：./path/to/shared/.eslintrc
-   插件中提供的配置：plugin:react/recommended
    > 可以在 eslint-plugin-react/index.js 中看到的配置详情，eslint-plugin- 的前缀可省略，/recommended 为包中抛出的 configs 的 recommended 属性
-   配置模块包：react-app
    > 实际配置在 eslint-config-react-app 中可以找到，eslint-config- 的前缀为可省略

通过 extends，可以方便的将统一的配置文件放置在自定义配置包中。假设我们现在定义一个通用的模块包名：@ucloud/eslint-config-console

### Package eslintConfig

ESlint 配置除了可以使用配置文件，也可以在 package.json 中配置 eslintConfig 字段，较配置文件稍微简洁一点。直接如下使用上述模块包：

```json
// package.json
{
    "name": "my-package",
    "eslintConfig": {
        "extends": "@ucloud/console"
    }
}
```

### 依赖包

可以将 ESLint 以及相关的插件、依赖包等安装到 config 包中，保证包的统一性。

### 参考

最终 @ucloud/eslint-config-console 如下

package.json

```json
{
    "name": "@ucloud/eslint-config-console",
    "version": "0.0.3",
    "description": "eslint config for console develop",
    "main": "index.js",
    "author": "zxbing0066@gmail.com",
    "dependencies": {
        "@typescript-eslint/eslint-plugin": "^2.6.1",
        "@typescript-eslint/parser": "^2.6.1",
        "babel-eslint": "^10.0.3",
        "eslint": "^6.6.0",
        "eslint-plugin-flowtype": "^4.3.0",
        "eslint-plugin-import": "^2.18.2",
        "eslint-plugin-jsx-a11y": "^6.2.3",
        "eslint-plugin-react": "^7.16.0",
        "eslint-plugin-react-hooks": "^2.2.0"
    }
}
```

indexjs

```javascript
module.exports = {
    root: true,
    parser: 'babel-eslint',
    plugins: ['import', 'flowtype', 'jsx-a11y', 'react', 'react-hooks'],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
        node: true
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    overrides: [
        {
            files: ['**/*.ts?(x)'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 2018,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true
                },
                warnOnUnsupportedTypeScriptVersion: true
            },
            plugins: ['@typescript-eslint'],
            extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended']
        }
    ],
    settings: {
        react: {
            version: 'detect'
        }
    }
};
```

项目中使用

```json
{
    "name": "my-project",
    "eslintConfig": {
        "extends": "@ucloud/console"
    }
}
```

## 保证配置不被篡改

通过 extends 可以方便统一配置，但是配置在各项目中依旧容易被篡改，这个时候需要做一些防范措施。

### CLI

如果有统一的开发用 CLI，可以在 CLI 中做好校验。

### commit hook

通过 commit hook 在项目 commit 时校验项目的 eslint 配置是否被篡改，不过依然可以绕过。

### CI/CD

可在 CI/CD 阶段做校验，配置篡改后直接报错。

### 发布系统发布时做校验

在最终发布时做好校验。

## 后续升级

前端技术发展迅猛，也需要考虑到后续升级的问题。

-   尽量保持配置一致性
-   可切割版本，老项目不做升级，新项目直接使用新版
-   通过 AST，将规则差异处做转换

## 总结

通过 ESLint extends 可以很好的统一团队的配置，并且不会影响 IDE 的 lint 提示。

借助 CI/CD 等工具做好检验工作，可以有效防止统一配置被篡改。
