FROM node:10.17.0-alpine3.10

WORKDIR /usr/app/server

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile && yarn cache clean

EXPOSE 3080

CMD ["yarn", "start-auth"]