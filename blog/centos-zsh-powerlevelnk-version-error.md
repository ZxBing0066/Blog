---
lastUpdate: 2022-5-21
date: 2022-5-21
tags: [zsh, FQA]
ignoreInList: true
---

# 解决 centos 下 zsh 安装 powerlevel10k 提示版本不匹配

centos 下使用 yum install zsh 后，再安装 oh-my-zsh 并安装 powerlevel10k（powerlevel9k 也会报错），会提示版本不匹配，如下：

```sh
You are using ZSH version 5.0.2. The minimum required version for Powerlevel10k is 5.1.
```

原因是 centos yum 源中最新版本的 zsh 为 5.0.2，而 Powerlevel10k 的 zsh 版本至少为 5.1，所以需要升级 zsh 版本。

可以通过手动安装新版的 zsh 解决，如下：

```sh
sudo yum update -y
sudo yum install -y git make ncurses-devel gcc autoconf man yodl
git clone -b zsh-5.7.1 https://github.com/zsh-users/zsh.git /tmp/zsh
cd /tmp/zsh
./Util/preconfig
./configure
sudo make -j 20 install
```

也可直接通过 powerlevel10k 作者提供的脚本 [zsh-bin](https://github.com/romkatv/zsh-bin) 来解决：

```sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/romkatv/zsh-bin/master/install)"
```

执行后根据提示选择推荐选项即可。
