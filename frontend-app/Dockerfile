FROM node:12.9.1-alpine
RUN mkdir -p application-frontend
COPY . /application-frontend
RUN yarn install
EXPOSE 3000
EXPOSE 35729
CMD [ "yarn", "start" ]