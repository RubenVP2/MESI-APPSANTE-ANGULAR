FROM node:15.3.0-alpine3.10

RUN mkdir -p /usr/src/MESI-APPSANTE-ANGULAR

COPY . /usr/src/mesi-appsante

WORKDIR /usr/src/mesi-appsante

RUN npm install
RUN npm install -g @angular/cli

EXPOSE 4200

CMD ng serve --host 0.0.0.0
