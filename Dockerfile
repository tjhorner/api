FROM node:erbium
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

CMD [ "node", "index" ]