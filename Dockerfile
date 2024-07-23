ARG NODE_VERSION=22.4.1
FROM node:${NODE_VERSION}-alpine

RUN apk --no-cache add \
    bash \
    curl \

RUN node --version
RUN yarn --version
RUN npm --version

RUN mkdir -p /app/source

RUN yarn global add \
    --ignore-optional \
    --no-progress \
    --no-emoji \
    --no-cache \
    bunyan

WORKDIR /app/source

COPY package.json tsconfig.json .prettierrc.json .yarnrc.yml .eslintrc.json .editorconfig /app/source/
COPY .yarn /app/source/.yarn
COPY src /app/source/src
COPY packages /app/source/packages

RUN npm install -g corepack
RUN corepack enable

RUN yarn \
    && yarn setup \
    # && yarn \
    #   --silent \
    #   --skip-integrity-check \
    #   --ignore-scripts \
    && yarn cache clean

CMD ["yarn", "start"]

# ENTRYPOINT ["/sbin/tini", "--"]