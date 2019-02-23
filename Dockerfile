FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update \
 && apt-get install build-essential \
 && yarn install
COPY . .

EXPOSE 3000
CMD [ "yarn", "dev" ]