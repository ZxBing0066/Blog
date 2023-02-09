# 要搞懂如何使用 babel，也许你应该先弄清楚 babel 中的这些包

## 生态

### parser：转换为 ast

### traverse：遍历 ast

### generator：代码生成、sourcemap 生成

### types：ast 类型库

### core：整套流程，集合了 parser、traverse、generator

### runtime、plugin-transform-runtime：plugin 负责将部分运行时转换代码转换为从 runtime 中 import，便于复用

### standalone：生产环境使用 babel 运行时转译

### register

### template

### code-frame

### polyfill、corejs：corejs 可按需生成 polyfill

### cli：cli 工具

### preset：预设包，针对环境和配置进行转译

### 各种插件
