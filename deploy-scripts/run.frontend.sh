#/bin/bash
SRC_PATH=/home/dima/polish-learn
SERVICE_NAME=lang-frontend

cd $SRC_PATH/polish-fe

yarn

pm2 delete $SERVICE_NAME
pm2 start "NODE_ENV=production yarn start" --name $SERVICE_NAME

cd $SRC_PATH