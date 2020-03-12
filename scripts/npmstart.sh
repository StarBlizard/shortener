#!/bin/sh
cd /home/ubuntu/karlo-backend

sudo pm2 kill
sudo npm install --save bcrypt
sudo npm run start:staging
