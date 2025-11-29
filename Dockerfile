FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install passport-local @types/passport-local

COPY . .

RUN npx prisma generate
RUN npm run build

CMD ["node", "dist/main"]