# B2 CRUD
Video
-----------------------------

This is a recorded presentation, for stating how it works



This is how to get going with the docker installation.

### Start it:

```
docker-compose up

# or start in the background
docker-compose up -d
```

Take it down by:

```
docker-compose down

# or remove the volume (database) and start over from scratch
docker-compose down -v
```

The database MongoDB listens on its default port 27017 when you start it in the container.


### if not your first running this project and you want to clear history

```
docker-compose down
docker rm -f $(docker ps -a -q)
docker volume rm $(docker volume ls -q)
docker-compose up -d
```


### install dependencies
```
npm install
```


### run project
```
npm start
```


### access project
```
url: localhost:8000
```

### environment of mine 

node -v                           INT  %  23:40:08
v16.19.1

docker --version                  ok | %  23:40:30
Docker version 20.10.22, build 3a2c30b

docker-compose --version       ok | %  23:41:05
Docker Compose version v2.15.1

npm -v                     127 err  %  23:41:32
8.19.3
