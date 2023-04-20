#!/bin/bash

GIT_REPO=$1

docker network create app_network

docker build --build-arg GIT_REPO=$GIT_REPO -t myapp .
docker run --name myapp --network app_network -p 8080:80 myapp
