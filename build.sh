#!/bin/bash
OUTPUT=dist
FILES=(
  "index.html"
  "assets"
  "vendor/font-awesome/css/font-awesome.min.css"
  "vendor/font-awesome/fonts"
  "vendor/bootstrap/dist/css/bootstrap.min.css"
)
DIRS=(
  "js"
  "vendor/font-awesome/css"
  "vendor/bootstrap/dist/css"
)

red='\x1B[0;31m'
magenta='\x1B[0;35m'
green='\x1B[0;32m'
yellow='\x1B[1;33m'
NC='\x1B[0m'

PWD=`pwd`

echo -e "${magenta}++ Building dist package ++ ${NC}"

echo -e "${green}rm output ${NC}"

if [ -d "$OUTPUT" ]; then
 rm -rf $PWD/$OUTPUT
fi

echo -e "${green}mkdir output ${NC}"
for i in ${DIRS[@]};
do
  echo -e "${red}mkdir > $i ${NC}"
  mkdir -p $PWD/$OUTPUT/$i
done

echo -e "${green}browserify & uglify ${NC}"
browserify js/index.js  | uglifyjs -mc > "$OUTPUT"/js/bundle.js

echo -e "${green}cp files ${NC}"
for i in ${FILES[@]};
do
  echo -e "${red}cp > $i ${NC}"
  cp -R  $PWD/$i $PWD/$OUTPUT/$i
done

echo -e "${magenta}++ done√ ++ ${NC}"
