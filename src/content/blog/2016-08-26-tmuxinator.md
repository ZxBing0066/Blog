---
title: tmuxinator 使用
description: tmuxinator 是一个 tmux 的管理工具,使用它可以很方便的创建和管理 tmux
pubDate: '2016-08-26'
tags:
    - terminal
    - tmux
---

# tmuxinator 使用

> tmuxinator 是一个 tmux 的管理工具,使用它可以很方便的创建和管理 tmux. [github 地址](https://github.com/tmuxinator/tmuxinator)

### 安装

```bash
gem install tmuxinator
```

### 设置默认编辑器

tmuxinator 某些操作(如创建项目后打开)会需要调用默认编辑器,可以执行以下命令查看默认编辑器:

```bash
echo $EDITOR
```

若是没有设置可以将以下代码添加到你的默认 shell 配置文件中:

```bash
export EDITOR='vim'
```

### 自动补全

从仓库中或者是源码中下载对应的文件放到`~/.bin`文件夹中,然后将其配置到`shell`配置文件中,以`zsh`为例:

```
source ~/.bin/tmuxinator.zsh
```

### 使用

-   创建一个项目

    ```bash
    tmuxinator new [project]
    ```

-   编辑项目

    ```bash
    tmuxinator open [project]
    ```

-   打开一个 session

    ```bash
    tmuxinator start [project] [alias]
    ```

    使用 alias 将会为 session 设定一个别名,让同一个配置文件可以重用

### 其他命令

-   复制一个已有的项目

    ```bash
    tmuxinator copy [existing] [new]
    ```

-   列出所有项目

    ```bash
    tmuxinator list
    ```

-   删除项目

    ```bash
    tmuxinator delete [project]
    ```

-   清空所有配置项

    ```bash
    tmuxinator implode
    ```

-   检查环境配置文件等

    ```bash
    tmuxinator doctor
    ```

-   显示帮助

    ```bash
    tmuxinator help
    ```

-   显示项目执行的 shell 命令

    ```bash
    tmuxinator debug [project]
    ```

-   显示版本号

    ```bash
    tmuxinator version
    ```

### 项目文件详解

```yml
# ~/.tmuxinator/sample.yml

name: sample # 定义项目名称
root: ~/ # 项目根路径,所有window和pane的默认路径

# Optional. tmux socket
# socket_name: foo

# Runs before everything. Use it to start daemons etc.
# 启动项目前前会先执行下面的命令,
# pre: sudo /etc/rc.d/mysqld start

# Runs in each window and pane before window/pane specific commands. Useful for setting up interpreter versions.
# 大概意思是进入每个window和pane前都会执行下面的命令, 可以用来进入指定的解释器.
# pre_window: rbenv shell 2.0.0-p247

# Pass command line options to tmux. Useful for specifying a different tmux.conf.
# 用来定义项目自己的tmux配置文件
# tmux_options: -f ~/.tmux.mac.conf

# Change the command to call tmux.  This can be used by derivatives/wrappers like byobu.
# 额...
# tmux_command: byobu

# Specifies (by name or index) which window will be selected on project startup. If not set, the first window is used.
# 定义项目启动时默认进入那个窗口
# startup_window: logs

windows: # 下面是项目中的所有窗口定义
    - editor: # 窗口名称
          layout: main-vertical # 窗口的布局方式
          root: ~/ # 窗口的根目录,不定义就使用项目的root
          panes: # 窗口下的面板
              - vim # 面板默认执行命令
              - guard
    - server: bundle exec rails s
    - logs: tail -f log/development.log
```
