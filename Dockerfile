FROM node:19 as builder

WORKDIR /app

COPY package.json tsconfig.json yarn.lock rollup.config.js ./
COPY ./src ./src

RUN yarn install --frozen-lockfile --check-files
RUN yarn build
RUN mkdir -p /shared && cp /app/audit-trades-linux /shared && ls -la /shared

FROM bitnami/minideb:latest

WORKDIR /app

COPY --from=builder /shared/audit-trades* ./

ENTRYPOINT ["/app/audit-trades-linux"]
