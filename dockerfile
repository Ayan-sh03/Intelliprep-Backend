FROM node:18-alpine

#create a app directory
WORKDIR /app

#Install app dependencies
COPY package*.json ./

#Run npm  install

RUN npm install

#bUNDLE app source
COPY . .

EXPOSE 8080

CMD ["npm","start"]