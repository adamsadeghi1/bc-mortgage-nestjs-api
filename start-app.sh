npm run build

docker stop mortgage-nestjs-container
docker rm -f mortgage-nestjs-container
docker rmi -f mortgage-nestjs-image

docker build -t mortgage-nestjs-image .
docker run -d -p 3005:3005 --name mortgage-nestjs-container mortgage-nestjs-image