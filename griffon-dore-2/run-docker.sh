#!/bin/bash
pwd
# Check if container is running
echo "Checking if container is running..."
#if [ "$(docker ps -q -f name=griffon-ng)" ]; then
#    echo "Container is running. Stopping and removing..."
docker kill griffon-ng
docker rm griffon-ng
#fi

docker volume rm griffon-dore-2_griffon-index

# Build Angular App
echo "Building Angular App..."
#npm run build
ng build

# build and run
echo "Building and running container..."


#docker build -t griffon-ng .
#docker run -p 80:80 --name griffon-ng -d griffon-ng
docker compose up --build

