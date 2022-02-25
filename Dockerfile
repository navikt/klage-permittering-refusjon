FROM node:alpine as builder
FROM navikt/node-express:16
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

USER root
RUN yarn install --no-optional
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
USER apprunner

COPY src/ src/
COPY public/ public/
COPY craco.config.js ./
COPY tsconfig.json ./
RUN yarn build

COPY start.sh ./

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]
