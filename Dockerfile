FROM node:16.15
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install --include=dev

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "serve", "--", "--host"]
