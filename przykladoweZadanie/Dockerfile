# Dockerfile - etap 1
FROM alpine:latest

# Instalacja niezbędnych pakietów
RUN apk add --update --no-cache curl git

# Utworzenie katalogu dla aplikacji
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Pobranie i zbudowanie aplikacji przykładowej
RUN apk add --update nodejs npm
ARG GIT_REPO
RUN git clone $GIT_REPO .
RUN npm install --force
RUN npm run build


# Dockerfile - etap 2
FROM nginx:latest

# Skopiowanie zbudowanej aplikacji do katalogu serwera nginx
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Ustawienie polecenia ENTRYPOINT, aby uruchamiać serwer w pierwszym planie
ENTRYPOINT ["nginx", "-g", "daemon off;"]
