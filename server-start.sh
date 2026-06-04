#!/bin/bash
echo "Измениь владельца базы"
chown appuser:appgroup /home/appuser/app/server/data/database.sqlite
echo "nginx"
/etc/init.d/nginx start