FROM node:12.9.1-alpine
ADD package.json /usr/src/backend-app/
WORKDIR /usr/src/backend-app
RUN yarn install
COPY . /usr/src/backend-app/
EXPOSE 5000