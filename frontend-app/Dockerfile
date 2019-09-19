FROM node:12.9.1-alpine
ADD package.json /usr/src/frontend-app/
WORKDIR /usr/src/frontend-app
RUN yarn install
COPY . /usr/src/frontend-app/
EXPOSE 3000
EXPOSE 35729