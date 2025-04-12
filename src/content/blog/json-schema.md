---
title: 规范你的 JSON 配置，试试 JSON schema
pubDate: '2022-08-08'
tags:
    - json
---

不知道大家在写一些 `JSON` 配置时会不会经常觉得麻烦，每次都要打开文档去核对字段名称对不对、结尾有没有 `s`、结构是否正确、是不是数组等问题。然而我最近发现一些开源项目生成的配置文件中都开始使用 `JSON schema` 来规范配置文件，`IDE` 也会对 `JSON` 配置进行提示和检查，真香。本文介绍下 `JSON schema` 的使用方法和使用场景。

## 介绍

`JSON schema` 是一套对 `JSON` 进行规范化的方案，在 `JSON` 文件中声明 `schema` 即可使用 `JSON schema` 检查 `JSON` 文件的正确性，且大部分主流 `IDE` 可对 `JSON` 文件进行属性提示、字段校验。

## 使用

`JSON schema` 的使用方式非常简单，只需要在 `JSON` 文件中添加 $`schema` 字段，指定 `schema` 文件地址即可。

```json
{
    "$schema": "https://json.schemastore.org/jsconfig"
}
```

添加后，`IDE` 或其它工具将会根据目标地址中的 `schema` 定义对 `JSON` 文件进行检查和智能提示等等。

![picture 2](https://stg.heyfe.org/images/blog-json-schema-27.png)

如上图，会在编辑时自动提示字段名称，`hover` 字段名显示字段解释，类型错误的字段显示警告等等。

除了上述使用网络地址来标识 `schema` 文件外，还可以使用本地文件地址，比如：

```json
{
    "$schema": "./my-schema.json"
}
```

## schemastore

`schemastore` 中存储了很多项目常用的 `JSON schema`，地址：`https://www.schemastore.org/json/`，里面包含了常见的 `prettier`、`eslint`、`jsconfig`、`tsconfig`、各类 `ci/cd`、`lerna` 等工具的配置文件，可直接引用。

并且还提供了所有支持的清单：`https://www.schemastore.org/api/json/catalog.json`，开源项目可在 `https://github.com/schemastore/schemastore/` 中提交自己的 `schema`。

当然也可以自己管理，只需提供可访问的网络地址即可。

## 编写 schema

编写 `schema` 其实也很简单，`JSON schema` 也存在几套规范，我目前能看到的包括：

-   JSON Schema Draft 4
-   JSON Schema Draft 7
-   JSON Schema Draft 8
-   JSON Schema Draft 2020-12

上述对应的 `schema` 文件都可在 `schemastore` 中找到。

编写时同样可指定编写文件的 `$schema`，注意草案 8 和 2020-12 使用到了 `$recursiveRef`，而 `vsc` 暂不支持，所以下面使用 `Draft 7` 规范来进行编写。

```json
{
    "$schema": "https://json-schema.org/draft-07/schema",
    "$id": "my-schema"
}
```

可使用 `$id` 来表示 `schema`。

编写主要使用大两个属性，一个是 `properties`，用于定义属性，一个是 `definitions`，用于定义 `schema` 片段（可理解为变量）。

### properties

先看下 `properties` 的使用：

```json
{
    "properties": {
        "name": {
            "type": "string",
            "title": "this is your name"
        },
        "age": {
            "type": "number",
            "title": "this is your age"
        }
    }
}
```

上面定义了 `json` 中的两个属性，`name` 为字符串，`title` 为数字，`title` 为属性的描述，也可以使用 `description`。

然后我们在 `json` 文件中即可使用 `$schema` 来引用我们刚刚定义的 `schema`，如下：

```json
{
    "$schema": "my-schema.json",
    "name": "嘿嘿",
    "age": 32
}
```

### definitions

`definitions` 一般用于定义一些复杂类型，方便在 `schema` 中复用定义：

```json
{
    "definitions": {
        "name": {
            "type": "object",
            "properties": {
                "firstName": {
                    "description": "First name",
                    "type": "string"
                },
                "lastName": {
                    "description": "Last name",
                    "type": "string"
                },
                "middleName": {
                    "type": "string",
                    "description": "Middle name"
                }
            }
        }
    }
}
```

上述代码及定义里一个 `name` 的 `schema` 字段，包含 `firstName`、`lastName`、`middleName` 三个属性，然后我们需要在 `properties` 中引用它：

```json
{
    "properties": {
        "fullName": {
            "$ref": "#/definitions/name"
        }
    }
}
```

`$ref` 代表此处定义为引用，属性为引用的地址，`#` 为该 `schema` 文件的根，此处即为引用 `definitions` 中 `name` 的定义。

然后我们便可在 `json` 文件中使用我们刚刚定义的 `schema`：

```json
{
    "$schema": "my-schema.json",
    "fullName": {
        "firstName": "嘿",
        "lastName": "嘿"
    }
}
```

除了上述的属性定义等， `JSON schema` 还提供了其它的一些定义，如数组、数字的范围等等。

## 总结

`JSON schema` 可以用来规范我们的配置文件，借助 `IDE` 的智能提示还能降低我们编写配置文件的成本，如果存在这方面的需求，赶紧用起来吧。

## 参考

-   [JSON Schema](https://json-schema.org/)
-   [Understanding JSON Schema](https://json-schema.org/understanding-json-schema/)

## 关键字

-   `JSON schema`
-   `JSON` 提示
-   配置文件提示
-   `JSON` 规范