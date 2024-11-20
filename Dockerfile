FROM node:21

WORKDIR /usr/src/frontend_dream

COPY package.json pnpm-lock.yaml ./

RUN npm run install

COPY . .

EXPOSE 41499

RUN npm run build

CMD ["npm", "run", "preview"]