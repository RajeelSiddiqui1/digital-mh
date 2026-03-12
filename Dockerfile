FROM node:22 as build

WORKDIR/app

COPY package*.json/
RUM npm install

COPY . .
RUN npm run build

FROM nginx:apline


COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]