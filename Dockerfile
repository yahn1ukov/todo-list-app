FROM node:20-alpine AS build-stage

RUN npm i -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm i --frozen-lockfile

COPY . .

RUN pnpm build

FROM node:20-alpine AS production-stage

RUN npm i -g serve

WORKDIR /app

COPY --from=build-stage /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]