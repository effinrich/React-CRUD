FROM node:10.17.0-alpine3.10

WORKDIR /usr/app/client

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile && yarn cache clean

EXPOSE 3000

CMD ["yarn", "start"]