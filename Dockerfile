FROM node:22-alpine3.19 as builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./
RUN npm i -D prisma
RUN npx prisma generate
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
