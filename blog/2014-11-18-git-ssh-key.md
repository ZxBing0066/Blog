---
date: 2014-11-12 12:07:43
tags: [git]
---

# Git 中使用 ssh key

> 在`git`中使用`https`协议时每次`push`都需要输入密码来验证身份,这样就会显得有些麻烦,然后`git`协议的好处就出现了,使
> 用`git`协议可以通过设置`ssh key`来省去每次输入密码验证的操作,省事多了~

## 生成`ssh key`公钥

首先检查一下是否已经生成:

```bash
$ cd ~/.ssh
$ ls
```

关键是看有没有用`something`和`something.pub`来命名的一对文件，这个`something`通常就是`id_dsa`或`id_rsa`。有`.pub `后缀的
文件就是公钥，另一个文件则是密钥。假如没有这些文件，或者干脆连`.ssh`目录都没有，可以用`ssh-keygen`来创建。该程序
在`Linux/Mac`系统上由`SSH`包提供，而在`Windows`上则包含在`MSysGit`包里.若是已经生成可直接进入下一步.

## 创建`ssh key`:

```bash
$ ssh-keygen -t rsa -C "your_email@example.com"
```

然后便会提示输入密码,直接`Enter`跳过吧.. 然后便会提示已经生成到`~/.ssh`下面,Ok,可以进入下一步了

## 将公钥添加到`Github`

直接打开`~/.ssh/id_rsa.pub`,将内容全部复制,然后登陆`Github`,点击`Settings->SSH keys`,然后点击`Add SSH key`,将内容复制进
去就可以啦.后面`clone`仓库的时候直接使用`git`协议便可以免去每次输入密码的麻烦了.

## 将`https`协议`clone`的仓库修改为`git`协议

查看当前`remote url`:

```bash
$ git remote -v
```

修改`remote url`:

```bash
$ git remote set-url origin git@github.com:someaccount/someproject.git
```

OK 就这么多了~搞定收工

[参考地址:http://git-scm.com/](http://git-scm.com/book/zh/v1/%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%9A%84-Git-%E7%94%9F%E6%88%90-SSH-%E5%85%AC%E9%92%A5)
