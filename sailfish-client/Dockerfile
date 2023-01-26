FROM node:18-alpine

WORKDIR /code

COPY . .

RUN npm install

EXPOSE 3001

CMD [ "npm", "run", "dev" ]