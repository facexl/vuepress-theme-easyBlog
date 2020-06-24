#!/usr/bin/env sh

set -e

cp -r blog .vuepress

mv .vuepress/blog .vuepress/原稿

mv .vuepress/原稿 .vuepress/dist/原稿

cd .vuepress/dist

git init

git add -A

git commit -m 'deploy'

git push -f git@github.com:facexl/facexl.github.io.git master

cd -