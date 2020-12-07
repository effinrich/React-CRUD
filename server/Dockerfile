FROM node:10.17.0-alpine3.10

WORKDIR /usr/app/server

COPY package.json ./

RUN yarn install && yarn cache clean

EXPOSE 8000

CMD ["yarn", "start-auth"]