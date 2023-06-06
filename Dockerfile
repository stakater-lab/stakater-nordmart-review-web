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

# build the application
RUN npm run build -- --env VERSION=$VERSION

# expose port
EXPOSE 4200

CMD ["node", "server.js"]
