FROM node:18.17.1-alpine AS base-stage

WORKDIR /usr/src/app
COPY package*.json ./

FROM base-stage AS build-stage
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm cache clean --force && npm install
COPY . .
RUN npm run generate:node:hyperchain

FROM base-stage AS production-stage
COPY --from=build-stage /usr/src/app/.output/public ./dist
RUN npm i -g http-server

ARG PORT=3000
ENV PORT=${PORT}

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

WORKDIR /usr/src/app/dist

CMD ["docker-entrypoint.sh"]
