FROM node:8.10.0-alpine
MAINTAINER Carlos Justiniano cjus34@gmail.com
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
WORKDIR /usr/src/app
RUN npm install --production
ENTRYPOINT ["node", "requestmob.js"]
