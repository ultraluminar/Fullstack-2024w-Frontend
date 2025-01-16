FROM node:23.4-bookworm-slim

WORKDIR /app
RUN mkdir /interface

COPY /frontend/package.json /frontend/package-lock.json ./
RUN npm ci
COPY /frontend .
COPY /interface /interface

RUN npm install -g @angular/cli

EXPOSE 4200

ENTRYPOINT ["ng", "serve", "--host", "0.0.0.0"]
