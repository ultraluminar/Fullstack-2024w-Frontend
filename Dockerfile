FROM node:23.4-bookworm-slim

WORKDIR /app

COPY /frontend/package.json /frontend/package-lock.json ./

RUN npm install -g @angular/cli
RUN npm ci
COPY /frontend .

EXPOSE 4200

ENTRYPOINT ["ng", "serve", "--host", "0.0.0.0"]
