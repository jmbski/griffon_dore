# STEP 1: Build
#FROM node:18.13-alpine AS build
#WORKDIR /src/app
#COPY package.json package-lock.json ./
#RUN --mount=type=cache,target=/node_modules \
#npm ci && npm install
#RUN npm ci
#RUN npm install
#COPY . .
#RUN npm run build
#RUN npx ng build

# STEP 2: Run
FROM node:18.13-alpine
WORKDIR /src/app

#RUN --mount=type=bind,source="/var/www/companions-griffon-dore/html",target="/var/www/companions-griffon-dore/html"
COPY /dist/griffon-dore-2/browser/ /html/
#VOLUME griffon-index:/html/
#VOLUME griffon-index:/html/
#CMD ["npm", "start"]
#CMD ["ng", "serve", "--port", "4000"]
#EXPOSE 4000 
#docker run --network="host" -d -v /var/www/companions-griffon-dore/html:/var/www/companions-griffon-dore/html griffon-ng 