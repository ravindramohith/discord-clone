FROM node:22-alpine3.19 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
