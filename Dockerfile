FROM node:12.6.0 as build-deps

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]