#!/bin/sh
cd /home/ubuntu/shortener

sudo pm2 kill all
sudo npm install --save bcrypt
sudo npm run start:staging
