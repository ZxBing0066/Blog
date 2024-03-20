---
lastUpdate: 2022-10-14
date: 2022-10-14
tags: ['JavaScript']
---

# 用 JS 解析 excel 文件需要分几步

> 八月长江万里晴，千帆一道带风轻。

今天来聊一聊如何使用 `JS` 来解析 `excel` 文件，当然不是直接使用 `exceljs`、`sheetjs` 之类的库，那就没意思了，而是主要说一下 `JS` 解析 `excel` 表格是如何实现的。

注意本文主要讨论 `xlsx` 格式的 `excel` 表格，其它格式未探究并不清楚。

## excel 表格文件到底是什么

首先要解析 `excel` 文件，得先了解他是如何存储数据的，经过我百般搜索，终于在 `GG` 中找到了答案：`excel` 文件其实是一个 `zip` 包！于是我赶紧新建了一个 `xlsx` 文件，在其中新建了两个 `sheet` 表，两个 `sheet` 表数据如下：

此为 `sheet` 1：

| A   | B   | C   |
| --- | --- | --- |
| 1   |     | 2   |
| 1   |     | 2   |
|     |     |     |
|     |     |     |
|     |     |     |
| 1   |     | 2   |
| 1   |     | 2   |

此为 `sheet` 2：

| A   | B   |
| --- | --- |
| q   | a   |
| q   | a   |
| q   | a   |

然后使用 `zip` 进行解压：

```sh
unzip test.xlsx -d test
```

然后通过 `tree` 我们就拿到这样一个目录结构：

```sh
test
├── [Content_Types].xml
├── _rels
├── docProps
│   ├── app.xml
│   ├── core.xml
│   └── custom.xml
└── xl
    ├── _rels
    │   └── workbook.xml.rels
    ├── sharedStrings.xml
    ├── styles.xml
    ├── theme
    │   └── theme1.xml
    ├── workbook.xml
    └── worksheets
        ├── sheet1.xml
        └── sheet2.xml
```

啊哈，干得漂亮，居然全都是 `xml` 文件。

我们在打开 `xml` 一探究竟，可以看出有几个文件很显眼，就是 `worksheets` 下的 `sheet1.xml` 和 `sheet2.xml`，还有 `workbook.xml`，其他的 `styles`、`theme` 一看就是和样式有关系，`_rels` 感觉就是什么内部引用，我们先看看两个 `sheet` 的 `xml` 文件，看看猜测是否正确，贴下 `sheet1.xml`：

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
    xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
    xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing"
    xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:etc="http://www.wps.cn/officeDocument/2017/etCustomData">
    <sheetPr/>
    <dimension ref="A1:C7"/>
    <sheetViews>
        <sheetView workbookViewId="0">
            <selection activeCell="D5" sqref="A3:D5"/>
        </sheetView>
    </sheetViews>
    <sheetFormatPr defaultColWidth="9.23076923076923" defaultRowHeight="16.8" outlineLevelRow="6" outlineLevelCol="2"/>
    <sheetData>
        <row r="1" spans="1:3">
            <c r="A1">
                <v>1</v>
            </c>
            <c r="C1">
                <v>2</v>
            </c>
        </row>
        <row r="2" spans="1:3">
            <c r="A2">
                <v>1</v>
            </c>
            <c r="C2">
                <v>2</v>
            </c>
        </row>
        <row r="6" spans="1:3">
            <c r="A6">
                <v>1</v>
            </c>
            <c r="C6">
                <v>2</v>
            </c>
        </row>
        <row r="7" spans="1:3">
            <c r="A7">
                <v>1</v>
            </c>
            <c r="C7">
                <v>2</v>
            </c>
        </row>
    </sheetData>
    <pageMargins left="0.75" right="0.75" top="1" bottom="1" header="0.5" footer="0.5"/>
    <headerFooter/>
</worksheet>
```

😂 相信大家已经看出来了，`sheetData` 就是 `excel` 表格中的数据了，`<row>` 代表行，其中的 `r` 则是行数索引，`row` 中的 `<c>` 应该是 `cell` 了，其中的 `<v>` 对应着 `cell` 中的值，而 `r` 则是 `cell` 的位置，如 `A7` 代表着在 `A` 列 7 行。

此外还有几个很明显的属性如 `dimension` 可以看出是表格的大小范围，从 `A1 cell` 到 `C7 cell` 形成一个框。`<sheetViews>` 中存储的应该是页面中的信息，`<selection>` 代表的应该就是被选中的表格内容了。

而 `workbook` 中存储的则是 `sheet` 的信息：

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
    xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
    <fileVersion appName="xl" lastEdited="3" lowestEdited="5" rupBuild="9302"/>
    <workbookPr/>
    <bookViews>
        <workbookView windowHeight="16360" activeTab="1"/>
    </bookViews>
    <sheets>
        <sheet name="Sheet1" sheetId="1" r:id="rId1"/>
        <sheet name="Sheet2" sheetId="2" r:id="rId2"/>
    </sheets>
    <calcPr calcId="144525"/>
</workbook>
```

剩下的几个 `xml`，大概看了一眼，存储的信息还算很清楚，比如：

-   `app` 中存储了文件程序的信息，好像还有文件名
-   `core` 中保存了作者的信息和创建、修改时间
-   `rels` 文件也是 `xml` 格式，存储了一些其它 `xml` 的引用
-   `theme` 里存储了表格中定义的颜色、字体
-   `[Content_Types]` 里则是所有文件的引用，猜测估计为解析的入口文件

## JS 实现步骤

知道了 `excel` 文件是如何存储数据的，那我们如何用 `js` 来解析它就很清楚了，主要分三步：

1. 使用 `js` 解压缩 `excel` 文件
2. 获取到其中的 `sheet` 文件内容，然后将 `xml` 数据解析出来
3. 将数据转换成我们想要的形状

说干就干，那我们来实操一下：

### ZIP 解压

关于 `JS` 如何实现 `ZIP` 解压的，上一篇文章也有提到，这里我们就不细说，直接使用 `jszip` 搞定：

```js
document.querySelector('#file').addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    const zip = await JSZip.loadAsync(file);
    const sheetXML = await zip.files['xl/worksheets/sheet1.xml'].async('string');
});
```

快速搞定，现在 `sheetXML` 就是我们刚刚看到的 `sheet1.xml` 中的数据了。

### XML 解析

然后我们即可解析 `XML` 内容将其中数据取出，`xml` 解析原理很简单，和 `html parse` 一样，了解原理咱就直接随便搞个开源库帮忙搞定：

```js
import convert from 'xml-js';

const result = convert.xml2json(sheetXML, { compact: true, spaces: 4 });
```

然后我们就得到了这样一串 `JSON`（删除了部分内容）：

```json
{
    "_declaration": {
        "_attributes": {}
    },
    "worksheet": {
        "_attributes": {},
        "sheetPr": {},
        "dimension": {
            "_attributes": {
                "ref": "A1:C7"
            }
        },
        "sheetData": {
            "row": [
                {
                    "_attributes": {
                        "r": "1",
                        "spans": "1:3"
                    },
                    "c": [
                        {
                            "_attributes": {
                                "r": "A1"
                            },
                            "v": {
                                "_text": "1"
                            }
                        },
                        {
                            "_attributes": {
                                "r": "C1"
                            },
                            "v": {
                                "_text": "2"
                            }
                        }
                    ]
                },
                {
                    "_attributes": {
                        "r": "2",
                        "spans": "1:3"
                    },
                    "c": [
                        {
                            "_attributes": {
                                "r": "A2"
                            },
                            "v": {
                                "_text": "1"
                            }
                        },
                        {
                            "_attributes": {
                                "r": "C2"
                            },
                            "v": {
                                "_text": "2"
                            }
                        }
                    ]
                },
                {
                    "_attributes": {
                        "r": "6",
                        "spans": "1:3"
                    },
                    "c": [
                        {
                            "_attributes": {
                                "r": "A6"
                            },
                            "v": {
                                "_text": "1"
                            }
                        },
                        {
                            "_attributes": {
                                "r": "C6"
                            },
                            "v": {
                                "_text": "2"
                            }
                        }
                    ]
                },
                {
                    "_attributes": {
                        "r": "7",
                        "spans": "1:3"
                    },
                    "c": [
                        {
                            "_attributes": {
                                "r": "A7"
                            },
                            "v": {
                                "_text": "1"
                            }
                        },
                        {
                            "_attributes": {
                                "r": "C7"
                            },
                            "v": {
                                "_text": "2"
                            }
                        }
                    ]
                }
            ]
        }
    }
}
```

接下来，我们只需要将 `sheetData` 中的数据取出，然后按照内部的属性生成自己想要的数据格式即可。

## 总结

`excel` 文件本质就是一个 `zip` 包，我们只需要通过 `zip` 解压、`xml` 解析、数据处理这三个步骤，即可使用 `JS` 读取到其中的数据，当然其中的细节还是很多的，不过如果只是简单的 `excel` 模版，不妨自己尝试一下。
