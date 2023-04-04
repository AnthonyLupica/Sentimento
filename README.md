# sentimento  
Senior Seminar Capstone || Spring 2023  
Angelo Indre, Anthony Lupica, Jenice Mario  
  
  
# Project Description
Sentimento: A reinvented journal. Entries will be scanned and highlighted for emotive words, such as happy/sad/ etc upon submission. These will be split into percentages that comprise a mood for the day. Using RGB for each 5 emotions, a color for the day will be created. This can be tracked for the week, month, year, etc. and can help users track their moods/emotions/feelings through that time. 

# Docker

starting the frontend and backend is now a two-step process with three commands thanks to docker.

first build both containers with docker build
```
$ docker build -f Dockerfile.frontend --target dev -t frontend
$ docker build -f Dockerfile.backend --target dev -t backend
```
then run them with docker compose
```
$ docker compose up -d
```
safely stop the frontend and backend with
```
$ docker compose down
```

flags in order of appearance:
```
-f          # Specifies the Dockerfile to be used to build
--target    # Specifies which version of the container to build (dev is the only one right now)
-t          # Tags the container we make with a name for later reference
-d          # Lets both frontend and backend run in background 
```

If you want to see the logs for frontend or backend while running
```
$ docker ps              # displays info about running containers including an id
$ docker logs <id> -f    # Tracks the logs of the specified container (remove -f for a onetime view rather than follow)
ctrl + c                 # Quit following logs
```