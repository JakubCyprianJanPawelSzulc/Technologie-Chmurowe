FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

COPY custom.conf.template /etc/nginx/conf.d/

ENV NGINX_PORT=80

CMD envsubst '$NGINX_PORT' < /etc/nginx/conf.d/custom.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'