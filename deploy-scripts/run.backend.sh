#/bin/bash
SRC_PATH=/home/dima/polish-learn
SERVICE_NAME=lang-backend

cd $SRC_PATH/backend

yarn
rm -rf dist
yarn build

pm2 delete $SERVICE_NAME
pm2 start "NODE_ENV=production yarn start" --name $SERVICE_NAME

cd $SRC_PATH