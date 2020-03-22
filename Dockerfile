FROM node:12
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN yarn install
COPY . /usr/src/app
ENV NODE_ENV=production
RUN yarn build
EXPOSE 3000
ENTRYPOINT [ "yarn", "start" ]
