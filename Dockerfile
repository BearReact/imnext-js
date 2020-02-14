# Do the npm install or yarn install in the full image
FROM node:12 AS builder

ENV YARN_VERSION 1.19.2

WORKDIR /app
COPY package.json .
RUN yarn install --production
COPY . .
RUN yarn build

# And then copy over node_modules, etc from that stage to the smaller base image
FROM node:12
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["yarn", "start"]
