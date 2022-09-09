FROM node:16-alpine
ARG appId
ARG clientId
ARG clientSecret
ARG PORT
ARG webhookSecret
ARG privateKey
ARG webhookURL
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start"]
