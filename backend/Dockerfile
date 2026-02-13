FROM node:20-alpine

# Install build dependencies for native modules (liks bcrypt)
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# Use the docker-specific env file as the default if .env is missing
RUN cp .env.docker .env || true

EXPOSE 3000

CMD ["npm", "start"]
