FROM alpine:latest

RUN apk add --update --no-cache curl git

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk add --update nodejs npm
ARG GIT_REPO
RUN git clone $GIT_REPO .
RUN npm install --force
RUN npm run build


FROM nginx:latest

COPY --from=0 /usr/src/app/build /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
