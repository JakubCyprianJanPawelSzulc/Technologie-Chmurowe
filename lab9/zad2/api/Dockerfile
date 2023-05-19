FROM arm64v8/node:14-slim

RUN apt-get update && apt-get install -y curl


COPY . /app

WORKDIR /app

RUN npm install

HEALTHCHECK --interval=10s --timeout=5s \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "server.js"]