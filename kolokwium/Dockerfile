FROM node:14-alpine as builder
WORKDIR /app/czas
COPY package*.json ./
RUN npm install
COPY app/czas ./
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
ENV PORT=80
EXPOSE $PORT
CMD ["nginx", "-g", "daemon off;"]
