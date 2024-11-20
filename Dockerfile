FROM node:21

WORKDIR /usr/src/frontend_dream

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 41499

RUN pnpm build

CMD ["pnpm", "preview"]