#!/bin/bash

docker volume create nginx_data

docker run -d -p 80:80 -v nginx_data:/usr/share/nginx/html --name nginx_container nginx

docker exec -it nginx_container bash -c "echo 'bawaria dobrzewino' > /usr/share/nginx/html/index.html"
