FROM node:22-alpine3.19 as builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./
COPY . .
RUN npm i -D prisma@5.1.1
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
