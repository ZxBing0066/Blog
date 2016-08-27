#!/bin/zsh
basePostDirPath="./_posts/"
date1=`date "+%Y-%m-%d"`
date2=`date "+%Y-%m-%d %H:%M:%S"`

# input the name of new post
printf "Please input the name of your new post:"; read postName

# filename with full path
fullFileName="${basePostDirPath}${date1}-${postName}.md"

if [[ -a "${fullFileName}" ]]; then
    echo "exist"
    exit 0
fi

# create the post file
touch ${fullFileName}

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

# echo the template to the new post file
echo "---\nlayout: post\ntitle: ""\ndate: ${date2}\nauthor: ZxBing0066\nblogid: ${postId}\ncategories: \ntags: \n---" > ${fullFileName}
# edit the post file
"/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" ${fullFileName}