FROM node:20-alpine as dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "dist/main.js"]