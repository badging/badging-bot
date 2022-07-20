FROM node:16
WORKDIR /bot
COPY package*.json ./

RUN npm ci
COPY . .
EXPOSE 5050
CMD npm start

