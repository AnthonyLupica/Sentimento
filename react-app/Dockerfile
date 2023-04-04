# Base for frontend
FROM node:18-alpine AS base
WORKDIR /react-app
COPY package-lock.json package.json ./
RUN npm install
COPY . .

# development version run command
FROM base AS dev
CMD [ "npm", "run", "dev" ]
