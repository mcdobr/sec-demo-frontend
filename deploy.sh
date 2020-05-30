#!/bin/zsh
rm -rf ./dist
ng build --prod --aot
aws s3 cp ./dist ${CC_FRONTEND_S3_BUCKET_URL} --recursive
