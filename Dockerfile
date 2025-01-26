FROM node:18 as builder

WORKDIR /build

COPY . .
RUN npm install
CMD [ "node","index.js" ]