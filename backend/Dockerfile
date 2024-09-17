# Stage 1: Build
FROM node:14-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/main.js"]
