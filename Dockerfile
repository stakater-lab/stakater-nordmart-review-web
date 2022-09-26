FROM node:14 as builder

LABEL name="Nordmart review" \
  maintainer="Quang <quang@stakater.com"

# set workdir
RUN mkdir -p $HOME/application
WORKDIR $HOME/application

# copy the entire application
COPY . .

# install dependencies
RUN npm ci
ARG VERSION
ARG MATOMO_BASE_URL

# build the application
RUN npm run build -- --env VERSION=$VERSION MATOMO_BASE_URL=$MATOMO_BASE_URL

EXPOSE 4200

CMD ["node", "server.js"]
