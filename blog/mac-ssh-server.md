# Mac 开启 ssh 登陆

家里一台 Mac mini，一台 MacBook Air，平时比较习惯用 MacBook，但是偶尔需要上 mini 上去修改一些服务，每次都要切换键盘鼠标什么的比较麻烦，所以干脆把 Mac mini 的 ssh server 打开了。

## 开启

首先在从 General 中进入到 Sharing 配置：

![picture 1](https://stg.heyfe.org/images/blog-mac-ssh-server-1680937988753.png)

然后开启 Remote Login 即可：

![picture 2](https://stg.heyfe.org/images/blog-mac-ssh-server-1680938043307.png)

如果磁盘访问权限不够可以开启全盘访问权限再试：

![picture 3](https://stg.heyfe.org/images/blog-mac-ssh-server-1680938082610.png)

注意开启后 SFTP 服务也会一并生效。

## 连接

然后就可以从另一台电脑中通过局域网 ssh 到这台 Mac 了：

![picture 5](https://stg.heyfe.org/images/blog-mac-ssh-server-1680938208118.png)

如果忘记自己的 Mac 用户 ID，可以直接打开 terminal 然后使用 pwd 查看主路径，一般主路径文件夹名称就是自己的用户 ID。

开启后可以创建 authorized_keys 然后将自己的 ssh public key 丢进去，这样就不用输入密码了：

```sh
touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
echo {public_key} >> ~/.ssh/authorized_keys
```

也可以顺便在 .ssh/config 添加上。然后就可以使用 VSCode SSH Remote 上去开发了。