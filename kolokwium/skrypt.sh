#!/bin/bash

docker build -t myimage .

docker network create mynetwork

docker run -d \
  --name mycontainer \
  --network mynetwork \
  -p 80:80 \
  -e PORT=80 \
  myimage
