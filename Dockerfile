# Do the npm install or yarn install in the full image
FROM mhart/alpine-node AS builder
WORKDIR /app
COPY package.json .
RUN yarn install --production
COPY . .
RUN yarn build

# And then copy over node_modules, etc from that stage to the smaller base image
FROM mhart/alpine-node:12.13.1
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["yarn", "start"]