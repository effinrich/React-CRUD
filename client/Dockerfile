FROM node:10-alpine

RUN yarn global add nodemon@1.19.2

WORKDIR /usr/app/client

COPY package.json yarn.lock ./
RUN yarn cache clean --force && yarn install --ignore-optional --force

COPY . .
# EXPOSE 3000

CMD ["yarn", "start"]

# FROM node:10-stretch-slim

# RUN curl -o- -L https://yarnpkg.com/install.sh | \  bash -s -- --version 1.22.10
# RUN yarn global add nodemon@1.19.2

# RUN mkdir -p /usr/app/client

# ADD .yarn_cache /usr/local/share/.cache/yarn/v1/

# ADD ./package.json ./yarn.* /tmp/
# RUN cd /tmp && yarn
# RUN cd /usr/app/client && ln -s /tmp/node_modules 

# ADD . /usr/app/client

# EXPOSE 3000 

# WORKDIR /usr/app/client