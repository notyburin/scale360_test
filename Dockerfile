FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030
# CMD [ "npm", "run", "dev" ]
CMD [ "npm", "run", "prod" ]