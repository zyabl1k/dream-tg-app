FROM node:21

WORKDIR /usr/src/frontend_dream

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 41499

RUN yarn build

CMD ["yarn", "preview"]