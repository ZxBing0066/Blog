---
title: 乱花迷人眼 - 一文彻底看懂 package.json 中的各种 dependencies
pubDate: '2022-08-30'
tags: []
---

`package.json` 中存在各种各样的依赖定义：`dependencies`、`devDependencies`、`peerDependencies`、`optionalDependencies`、`bundleDependencies`，很容易让初学的开发者晕头，到底有什么区别。

依赖主要涉及到两个场景：

-   在当前项目的 `package.json` 中的依赖定义
-   当前项目中安装的包中的 `package.json` 中的依赖定义

所以下面每个依赖项定义都会通过两个维度来讨论：定义在项目中和定义在依赖中。

## dependencies

`dependencies` 表示该项目在运行时所需要用到的依赖项。

然而作为最常见的依赖项定义，经常会被不明所以的开发者误用（`dependencies` 一把梭 🤦‍♂️）。

### 定义在项目中

如果你开发的项目依赖于某个包来运行，那么你就可以选择将你所依赖的包添加到 `dependencies` 中。

`install` 时该依赖将会被下载，并可在项目的代码中使用。

### 定义在依赖中

当你开发一个项目需要用到一个 `A` 包时，假设 `A` 包的 `dependencies` 中存在如下定义：

```json
{
    "dependencies": {
        "B": "*"
    }
}
```

那你在项目中安装 `A` 包时，无论你的项目是否依赖 `B` 包，`B` 包都会作为 `A` 包的依赖同时被安装。

有些包的开发者可能会一股脑将各种依赖全部丢在包的 `dependencies` 中，这会导致开发者在使用该包时，会安装各种无用的包。

`install` 时该依赖会被下载，但是不应该在你的项目中直接引用该包，因为该包的安装路径会和包管理器行为相关，会导致幽灵依赖现象。

## devDependencies

`devDependencies` 表示在开发时所需要用到的或依赖的包。

### 定义在项目中

如果你的项目在开发中依赖某个包，但是在运行时不依赖，则可以将该包添加到 `devDependencies`。

`install` 时该依赖将会被下载，可以在代码中使用，但是请不要在项目要上线的代码中使用。

注意当 `NODE_ENV` 为 `production` 时，`install` 等效于 `install --production`，`devDependencies` 将不会被下载，这种场景一般常见于 `node` 项目中，比如开发时依赖测试库，但项目线上运行不需要安装测试库，但是一些前端项目在 `CI/CD` 中构建时可能会遇到问题，有些 `CI/CD` 中的 `NODE_ENV` 环境变量默认为 `production`，会导致在打包所需的依赖包不会被安装。

### 定义在依赖中

`install` 时依赖包中的 `devDependencies` 将会被忽略，不会被安装。

## peerDependencies

`peerDependencies` 主要用于依赖包中，表示安装该包时还需要安装哪些包，乍一看非常类似 `dependencies`，不过场景和行为都存在一定差异。

### 定义在项目中

`peerDependencies` 主要用于依赖包中，在项目中不起作用。

`install` 时 `peerDependencies` 不会被安装，开发时一般会配合 `devDependencies` 来实现开发和发包时的版本解耦。

```json
{
    "peerDependencies": {
        "react": "16 || 17 || 18"
    },
    "devDependencies": {
        "react": "16"
    }
}
```

### 定义在依赖中

`install` 时 `peerDependencies` 不会安装，但是包管理器会检查项目的依赖与 `peerDependencies` 是否匹配，如果版本不匹配或未安装，将会弹出警告。

包开发将依赖定义在 `peerDependencies` 中来避免项目中和依赖包中出现重复安装包所导致的包版本不相容、打包了多份不同版本的库等问题。

此外通过 `peerDependenciesMeta` 可以让 `peerDependencies` 作为可选依赖项，让开发者可以有选择性的选择需要的包：

```json
{
    "peerDependenciesMeta": {
        "soy-milk": {
            "optional": true
        }
    }
}
```

## optionalDependencies

`optionalDependencies` 用于定义可选依赖项，和 `dependencies` 非常类似，主要的差别在于：在 `optionalDependencies` 中的依赖包安装报错甚至找不到时不会影响到包管理器的安装行为。

### 定义在项目中

`install` 时会被安装，但是安装失败时不会中断安装行为，程序依旧可以正常运行。项目中使用时应该通过判定该包是否存在来决定所需要执行的代码。

### 定义在依赖中

`install` 时会被安装，但是安装失败时不会中断安装行为，程序依旧可以正常运行。

## bundleDependencies/bundledDependencies

`bundleDependencies` 是一个较为特殊的依赖项定义，不同于其它依赖项定义，他的数据结构是一个数组，需要配合 `dependencies` 使用。

```json
{
    "bundleDependencies": ["renderized", "super-streams"]
}
```

`bundleDependencies` 在项目中不起作用，在项目作为包发布时通过 `npm pack`，将会把 `bundleDependencies` 中的依赖包的本地代码和该项目包一起打包成一个文件。

在 `install` 时通过 `url` 指定 `pack` 打包好的文件，将会将文件中打包的依赖解压到包目录，而不会去根据 `dependencies` 中的定义去安装 `bundleDependencies` 中的包。

## 总结

简单总结下所有依赖的安装行为和使用场景：

| 依赖类型 | 包开发时行为 | 包作为项目依赖时行为 | 一句话总结 | 举例 |
| --- | --- | --- | --- | --- |
| `dependencies` | 会被安装 | 会被安装 | 定义包运行所需要的依赖包 | 某前端项目使用 `react` 进行开发，需要将 `react` 添加到 `dependencies` 中 |
| `devDependencies` | 会被安装 | 不会被安装 | 定义包在开发时所需要的依赖包 | `antd` 使用了 `@testing-library/react` 进行测试，需要将 `@testing-library/react` 添加到 `devDependencies` 中 |
| `peerDependencies` | 不会被安装 | 不会被安装，但是如果指向的依赖没有被安装或不符合时会有警告（`peerDependenciesMeta` 会影响该行为） | 定义该包运行所需要的依赖环境，一般和 `devDependencies` 一起使用 | `antd` 是一个 `react` 组件库，为了不和使用它的项目中的 `react` 版本定义造成冲突，需要将支持的 `react` 版本添加到 `peerDependencies` 中 |
| `optionalDependencies` | 会被安装，但是安装报错不会影响 | 会被安装，但是安装报错不会影响 | `optionalDependencies` 用于定义对包运行不会造成影响的依赖包 | 一个包在使用 `A` 包进行了某些操作，但是如果 `A` 包不在的话，可以使用别的 `API` 达到同样的效果，可以将 `A` 包添加到 `optionalDependencies` 中 |