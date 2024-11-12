FROM node:21.5.0

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npx", "nodemon", "--legacy-watch", "src/server.ts"]