#!/bin/bash

# Adres repozytorium z aplikacją przykładową
GIT_REPO=https://github.com/JakubCyprianJanPawelSzulc/Projekt-Frontend-Development.git

# Budowa obrazu
docker build --build-arg GIT_REPO=$GIT_REPO -t myapp-dev .

# Utworzenie sieci
docker network create app_network

# Uruchomienie kontenera z aplikacją
# docker run -d --name myapp-container -p 8080:3000 --network app_network myapp-dev
docker run -d --name myapp-container -p 8080:3000 myapp-dev


# Uruchomienie kontenera z serwerem nginx
# docker run -d --name nginx-container -p 80:80 --network app_network -v /path/to/nginx.conf:/etc/nginx/nginx.conf nginx
docker run -d --name nginx-container --network app_network -p 80:80 nginx
