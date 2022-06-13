#/bin/bash
SRC_PATH=/home/dima/polish-learn
SERVICE_NAME=lang-backend

cd $SRC_PATH

yarn

pm2 delete $SERVICE_NAME
pm2 start "NODE_ENV=production yarn start" --name $SERVICE_NAME
