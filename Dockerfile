FROM node:14-alpine as builder

LABEL name="Managed Openshift Frontend" \
  maintainer="Stakater <hello@stakater.com"

# set workdir
RUN mkdir -p $HOME/application
WORKDIR $HOME/application

# copy the entire application
COPY . .

# install dependencies
RUN npm ci

# build parameters
ARG REVIEW_API
ARG REVIEW_API

# build the application
RUN npm run build

# remove redundant files
RUN rm -rf lib/**/*.spec.js

EXPOSE 4200

CMD ["node", "server.js"]
