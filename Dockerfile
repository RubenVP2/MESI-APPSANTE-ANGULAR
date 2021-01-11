FROM node:15.3.0-alpine3.10

<<<<<<< HEAD
RUN mkdir -p /usr/src/mesi-appsante

COPY . /usr/src/mesi-appsante

WORKDIR /usr/src/mesi-appsante
=======
RUN mkdir -p /usr/src/MESI-APPSANTE-ANGULAR

COPY . /usr/src/MESI-APPSANTE-ANGULAR

WORKDIR /usr/src/MESI-APPSANTE-ANGULAR
>>>>>>> 4d42aaf6b0564a93e91ff07dec6e63c39aeb7dd7

RUN npm install
RUN npm install -g @angular/cli

<<<<<<< HEAD
EXPOSE 4200 

CMD ng serve --host 0.0.0.0
=======
EXPOSE 4200

CMD ng serve --host 0.0.0.0
>>>>>>> 4d42aaf6b0564a93e91ff07dec6e63c39aeb7dd7
