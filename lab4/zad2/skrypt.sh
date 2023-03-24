#!/bin/bash

mkdir -p nginx_data
mkdir -p nodejs_data
echo "Hello world!" > nginx_data/index.html
echo "console.log('Hello world!');" > nodejs_data/app.js

docker volume create nodejs_data
docker run -d --name nodejs_container -v nodejs_data:/app node:latest node /app/app.js

docker volume create all_volumes
docker run --rm -v all_volumes:/all_volumes -v nginx_data:/nginx_data -v nodejs_data:/nodejs_data busybox sh -c "cp -R /nginx_data/* /all_volumes && cp -R /nodejs_data/* /all_volumes"

docker stop nodejs_container
docker rm nodejs_container