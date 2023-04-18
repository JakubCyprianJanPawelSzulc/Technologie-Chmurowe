#!/bin/bash

GIT_REPO=https://github.com/JakubCyprianJanPawelSzulc/Projekt-Frontend-Development.git

docker build --build-arg GIT_REPO=$GIT_REPO -t myapp-dev .

docker network create app_network

# docker run -d --name myapp-container -p 8080:3000 --network app_network myapp-dev
docker run -d --name myapp-container -p 8080:3000 myapp-dev

# docker run -d --name nginx-container -p 80:80 --network app_network -v /path/to/nginx.conf:/etc/nginx/nginx.conf nginx
docker run -d --name nginx-container --network app_network -p 80:80 nginx
