FROM node:latest

WORKDIR /app

COPY app /app

RUN npm install

ENV NODE_ENV=production

CMD ["npm", "start"]