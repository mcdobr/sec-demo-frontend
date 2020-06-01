#!/usr/bin/env zsh
source /home/mircea/.zshrc
rm -rf ./dist
ng build --prod --aot
aws s3 cp ./dist/frontend ${CC_FRONTEND_S3_BUCKET_URL} --recursive
