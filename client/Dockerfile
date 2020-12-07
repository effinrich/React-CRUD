FROM node:10.17.0-alpine3.10

WORKDIR /usr/app/client

COPY package.json ./

RUN yarn install && yarn cache clean

EXPOSE 3000

CMD ["yarn", "start"]