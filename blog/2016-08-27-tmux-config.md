---
lastUpdate: 2022-4-11
date: 2016-08-27 5:45:43
tags: [terminal, tmux]
---

# Tmux 配置

### 配置文件

个人`tmux`配置文件地址是`~/.tmux.conf`,`mac`下的系统配置文件路径`/etc/tmux.conf`(不通系统下路径会不相同).

### 配置文件修改

-   修改默认前置快捷键

    ```conf
    # remap prefix from 'C-b' to 'C-a'
    unbind C-b # 解绑C-b
    set-option -g prefix C-a # 设置前置快捷键为C-a
    bind-key C-a send-prefix # 同上
    ```

    > TODO 实践了一下发现这块挺奇怪,第三句完全不起作用,一二两句可以生效,但是不写第一句好像也会被解绑,有时又会两个一起生效.待有空研究一下...

-   快速重载配置文件

    ```conf
    # reload config file (change file location to your the tmux.conf you want to use)
    bind r source-file ~/.tmux.conf \; display-message "config reloaded"
    ```

    配置后可实现`r`键直接从文件中刷新配置.并显示提示信息.

-   开启鼠标模式

    ```conf
    set -g mouse on
    ```

    配置后可以使用鼠标来完成 window,pane 的切换,拖拽选择内容,修改 pane 大小等功能. 上面是`tmux2.1`后的配置,`2.1`之前如何配置可以看参考文献中的地址或者自行搜索.

-   关闭自动重命名窗口

    ```conf
    # don't rename windows automatically
    set-option -g allow-rename off
    ```

    配置后可以防止窗口在执行命令是被自动重命名

-   样式修改

    ```conf
    ######################
    ### DESIGN CHANGES ###
    ######################

    # pane的样式
    set -g pane-border-fg black
    set -g pane-active-border-fg brightred

    # 状态栏样式
    set -g status-utf8 on # status-utf8在tmux2.1以上貌似不支持
    set -g status-justify left
    set -g status-bg default
    set -g status-fg colour12
    set -g status-interval 2

    # 消息栏样式
    set -g message-fg black
    set -g message-bg yellow
    set -g message-command-fg blue
    set -g message-command-bg black

    # 窗口模式
    setw -g mode-bg colour6
    setw -g mode-fg colour0

    # 窗口状态栏样式
    setw -g window-status-format " #F#I:#W#F "
    setw -g window-status-current-format " #F#I:#W#F "
    setw -g window-status-format "#[fg=magenta]#[bg=black] #I #[bg=cyan]#[fg=colour8] #W "
    setw -g window-status-current-format "#[bg=brightmagenta]#[fg=colour8] #I #[fg=colour8]#[bg=colour14] #W "
    setw -g window-status-current-bg colour0
    setw -g window-status-current-fg colour11
    setw -g window-status-current-attr dim
    setw -g window-status-bg green
    setw -g window-status-fg black
    setw -g window-status-attr reverse

    # Info on left (I don't have a session display for now)
    set -g status-left ''

    # 设置是否安静模式
    set-option -g visual-activity off
    set-option -g visual-bell off
    set-option -g visual-silence off
    set-window-option -g monitor-activity off
    set-option -g bell-action none

    set -g default-terminal "screen-256color"

    # The modes {
    setw -g clock-mode-colour colour135
    setw -g mode-attr bold
    setw -g mode-fg colour196
    setw -g mode-bg colour238

    # }
    # The panes { 面板样式

    set -g pane-border-bg colour235
    set -g pane-border-fg colour238
    set -g pane-active-border-bg colour236
    set -g pane-active-border-fg colour51

    # }
    # The statusbar { 状态栏

    set -g status-position bottom
    set -g status-bg colour234
    set -g status-fg colour137
    set -g status-attr dim
    set -g status-left ''
    set -g status-right '#[fg=colour233,bg=colour241,bold] %d/%m #[fg=colour233,bg=colour245,bold] %H:%M:%S '
    set -g status-right-length 50
    set -g status-left-length 20

    setw -g window-status-current-fg colour81
    setw -g window-status-current-bg colour238
    setw -g window-status-current-attr bold
    setw -g window-status-current-format ' #I#[fg=colour250]:#[fg=colour255]#W#[fg=colour50]#F '

    setw -g window-status-fg colour138
    setw -g window-status-bg colour235
    setw -g window-status-attr none
    setw -g window-status-format ' #I#[fg=colour237]:#[fg=colour250]#W#[fg=colour244]#F '

    setw -g window-status-bell-attr bold
    setw -g window-status-bell-fg colour255
    setw -g window-status-bell-bg colour1

    # }
    # The messages { 消息提示

    set -g message-attr bold
    set -g message-fg colour232
    set -g message-bg colour166

    # }
    ```

### 参考文献

[Making tmux Pretty and Usable](http://www.hamvocke.com/blog/a-guide-to-customizing-your-tmux-conf/)
