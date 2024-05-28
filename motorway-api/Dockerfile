FROM node:18 as motorway-api

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY tsconfig* .
COPY src/* .

RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
