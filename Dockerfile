FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable

COPY . ./

RUN pnpm i

RUN pnpm run build

FROM node:22-alpine
WORKDIR /app

COPY --from=build /app/.output ./

EXPOSE 3000

CMD ["node", "/app/server/index.mjs"]

