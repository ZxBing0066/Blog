---
lastUpdate: 2022-4-11
date: 2016-08-14 14:57:47
tags: [shell]
---

# Shell 脚本初尝试

> 使用`jekyll`新建`post`时需要填写很多重复参数,因为本人比较懒所以决定尝试写个`shell`脚本来创建`post`.

-   首先当然是申明脚本解释器,这个看个人需求或者喜好.

```bash
#!/bin/zsh
```

-   然后定义一下几个常用变量,分别是 posts 的存放目录,年月日格式的日期字符串,完整时间字符串.

```bash
basePostDirPath="./_posts/"
date1=`date "+%Y-%m-%d"`
date2=`date "+%Y-%m-%d %H:%M:%S"`
```

-   接下来是提示让用户(也就是我自己)输入 post 名称(用作文件名),然后生成完整的文件路径.

```bash
# input the name of new post
printf "Please input the name of your new post:"; read postName

# filename with full path
fullFileName="${basePostDirPath}${date1}-${postName}.md"
```

-   判断文件是否重名,防止不小心覆盖,重名则退出程序

```bash
if [[ -a "${fullFileName}" ]]; then
    echo "exist"
    exit 0
fi
```

-   非重名创建文件

```bash
# create the post file
touch ${fullFileName}
```

-   获取相同日期的 post 数组,计算数组长度,计算 postId.

```bash
# get the array of the posts doday used for get the id of post
posts=(`find ${basePostDirPath} -type f -name "${date1}*.md"`)
# get the length
postsL=${#posts[*]}

# compute post id
if test ${postsL} -lt 10; then
    postId="`date "+%Y%m%d"`0${postsL}"
else
    postId="`date "+%Y%m%d"`${postsL}"
fi
```

-   将模板内容输出到文件中,然后使用编辑器打开 post 文件

```bash
# echo the template to the new post file
echo "---\nlayout: post\ntitle:\ndate: ${date2}\nauthor: ZxBing0066\nblogid: ${postId}\ncategories: \ntags: \n---" > ${fullFileName}
# edit the post file
"/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" ${fullFileName}
```

<br/>

---

<br/>

## Trouble Shooting

-   生成文件模板中的`date`为当前的本地时间,但是使用`jekyll`生成的时候`jekyll`好像会检测时间,时间在当前时间往后的会不生成 ,所以导致创建的时候无法生成,应该是检测的时候使用的是世界标准时间,而本地是北京时间超前 8 小时,所以可以稍微做点`hack`去躲掉这一点,比如`date`只使用年月日,不包含具体时间,当然如果你是在早上 8 点前创建的话就另当别论了...
