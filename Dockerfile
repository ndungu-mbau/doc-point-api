FROM node:latest

WORKDIR /usr/src/app

ENV PORT 3000

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn

COPY . .

CMD ["node", "./src"]