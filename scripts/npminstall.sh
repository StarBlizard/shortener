#!/bin/sh
cd /home/ubuntu/shortener
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y libfontconfig
sudo npm install
sudo npm install -g pm2
