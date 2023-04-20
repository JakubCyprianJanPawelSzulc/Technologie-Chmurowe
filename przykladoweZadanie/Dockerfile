FROM alpine:latest

RUN apk add --no-cache \
    curl \
    git \
    nodejs \
    npm

ARG GIT_REPO=https://github.com/JakubCyprianJanPawelSzulc/Projekt-Frontend-Development.git
RUN git clone $GIT_REPO /app && \
    cd /app && \
    npm install --force && \
    npm run build

FROM nginx:latest

COPY --from=0 /app/build /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
