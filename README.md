# B2 CRUD
Video
-----------------------------

This is a recorded presentation, for stating how it works

[![2023-02-07 en]('click')](https://youtu.be/8Zki-S-kFgE)


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