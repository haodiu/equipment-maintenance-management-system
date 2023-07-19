FROM node:gallium-alpine AS dist
COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM node:gallium-alpine AS node_modules

RUN npm install -g npm@latest

COPY package*.json ./

RUN npm ci

FROM node:gallium-alpine

ARG PORT=3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=dist dist /usr/src/app/dist
COPY --from=node_modules node_modules /usr/src/app/node_modules

COPY . /usr/src/app

EXPOSE $PORT

CMD [ "npm", "run", "start:prod" ]
