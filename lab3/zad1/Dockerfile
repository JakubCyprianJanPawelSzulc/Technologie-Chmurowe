FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY index.html /usr/share/nginx/html/

ENV CONTAINER_IP 172.17.0.2

EXPOSE 8080

CMD sed -i "s/{CONTAINER_IP}/$CONTAINER_IP/" /etc/nginx/nginx.conf && nginx -g 'daemon off;'
