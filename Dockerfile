# FROM node:10.17.0-alpine3.10 AS react-app-build
# WORKDIR /usr/src/epcvip/app/
# COPY app/ ./app/
# RUN cd app && yarn install && yarn build

# FROM node:10.17.0-alpine3.10 AS server-build
# WORKDIR /usr/src/epcvip/api/
# COPY --from=react-app-build /usr/src/epcvip/app/build ./app/build
# COPY api/package*.json ./api/
# RUN cd api && yarn install
# COPY api/server.js ./api/

# EXPOSE 8000

# CMD ["node", "./api/server.js"]


# Setup and build the client

FROM node:10.17.0-alpine3.10 AS client-build
WORKDIR /usr/app/client
COPY client/ ./client/
RUN cd client && yarn install

RUN RUN CI=true yarn test

RUN yarn run build

# Setup the server

FROM node:10.17.0-alpine3.10 AS server-build
WORKDIR /usr/app/server
COPY --from=client-build /usr/app/client/build ./client/build
COPY server/package.json ./server/
RUN cd server && yarn install && yarn run build
COPY server/server.js ./server/

EXPOSE 8000

CMD ["node", "./server/server.js"]

# FROM node:10.17.0-alpine3.10

# WORKDIR /usr/app/
# COPY --from=client /usr/app/client/build/ ./client/build/

# WORKDIR /usr/app/server/
# COPY server/package*.json ./
# RUN yarn install
# COPY server/ ./

# ENV PORT 8000

# EXPOSE 8000

# CMD ["yarn", "start"]