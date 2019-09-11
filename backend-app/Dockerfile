FROM node:12.9.1-alpine
RUN mkdir -p application-backend
COPY . /application-backend
RUN yarn install
EXPOSE 5000
CMD [ "yarn", "start" ]