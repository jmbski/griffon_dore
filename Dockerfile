# Define a build stage
FROM node:18.13-alpine AS build
WORKDIR /app
COPY griffon-dore-2/package*.json ./
RUN npm ci
COPY griffon-dore-2 ./
RUN npx ng build

# Define backend stage

# Define a new stage based on Nginx to serve the compiled Angular app.
FROM nginx:1.17.1-alpine
WORKDIR /app
#/home/joseph/coding_base/griffon_dore/griffon-dore-2/dist/griffon-dore-2/browser
COPY --from=build /dist/griffon-dore-2/browser /usr/share/nginx/html
#VOLUME /var/www/companions-griffon-dore.com
#COPY nginx/companions-griffon-dore.com /var/www/companions-griffon-dore.com
#RUN echo "<h1>Hello from Volume</h1>" > /usr/share/nginx/html/index.html
VOLUME /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]