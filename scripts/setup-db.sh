#!/bin/bash

set -e

psql -c "CREATE DATABASE karlodev;" -U postgres
psql -c "CREATE USER karlodev;" -U postgres
  
node_modules/.bin/sequelize db:migrate