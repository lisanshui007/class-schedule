#!/bin/sh

git add .
git commit -m "$1"
git push

# 为使脚本可执行，还需要在命令行中执行以下命令：chmod +x push.sh
# 然后，可以使用以下命令将更改推送到远程仓库：./push.sh "commit message"