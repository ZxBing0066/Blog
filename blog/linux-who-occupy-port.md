---
tags: [Linux, Troubleshooting]
summary:
cover:
---

# Linux 排查端口占用进程详情

端口占用算是个非常常见的问题，记不住命令每次都得查一下，还是自己记录下算了。

## 正文

### 查看端口占用情况

排查端口占用的进程，可以使用 `lsof` 命令，`lsof` 是 list open files 的缩写，可以查看文件、目录、端口等信息。

```bash
lsof -i:端口号
```

例如查看 5432 端口的占用情况：

```bash
lsof -i:5432
```

这里需要注意权限问题，有些进程可能是通过 root 权限启动的，需要使用 `sudo` 命令。

```bash
sudo lsof -i:5432
```

![](https://stg.heyfe.org/images/blog-linux-who-occupy-port-1740195515536.png)

通过这一步我们可以获取到占用进程的 PID。

### 查看进程详情

拿到 PID 后，Linux 可通过查看 `/proc` 目录下的文件获取进程详情，例如查看进程 1234 的详情：

```bash
ls -l /proc/1234
```

![](https://stg.heyfe.org/images/blog-linux-who-occupy-port-1740195575770.png)

会列出进程的详细信息，包括进程的启动命令、环境变量、文件描述符等。一般会想要知道进程的启动命令，来确定到底是什么应用程序占用了端口。

可通过查看 `/proc/1234/cmdline` 文件获取进程的启动命令：

```bash
cat /proc/1234/cmdline; echo
```

加上 `; echo` 是为了换行，因为 cmdline 文件中的内容是没有换行符的，直接打印的内容会和连在一起不方便查看。

![](https://stg.heyfe.org/images/blog-linux-who-occupy-port-1740196002918.png)

也可通过查看 cwd 和 exe 的符号链接获取进程的当前工作目录和可执行文件：

```bash
ls -l /proc/1234 | grep -E 'cwd|exe'
```

![](https://stg.heyfe.org/images/blog-linux-who-occupy-port-1740196050770.png)

但是在某些类 Unix 系统上（如 MasOS），可能不存在 `/proc` 目录，这时可以使用 `ps` 命令查看进程详情：

```bash
ps -ef | grep 1234
```

![](https://stg.heyfe.org/images/blog-linux-who-occupy-port-1740196164850.png)

## 结语

以上应该可以满足大部分情况下的排查需求，如果还有其他情况，遇到了再说。
