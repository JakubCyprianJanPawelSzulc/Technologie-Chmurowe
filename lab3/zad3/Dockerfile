FROM node:14-alpine

RUN apk add --no-cache nginx openssl
RUN adduser -D myuser

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /etc/nginx/certs
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/certs/nginx.key -out /etc/nginx/certs/nginx.crt -subj "/CN=localhost"

RUN mkdir -p /var/cache/nginx && chown -R nginx:nginx /var/cache/nginx

COPY app.js /app.js

CMD ["node", "/app.js"]

EXPOSE 3000
