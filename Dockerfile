FROM node:15.3.0-alpine3.10

WORKDIR /usr/src/MESI-APPSANTE-ANGULAR/

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

EXPOSE 4200

CMD ng serve --host 0.0.0.0
