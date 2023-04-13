# sentimento  
Senior Seminar Capstone || Spring 2023  
Angelo Indre, Anthony Lupica, Jenice Mario  
  
  
# Project Description
Sentimento: A reinvented journal. Entries will be scanned and highlighted for emotive words, such as happy/sad/ etc upon submission. These will be split into percentages that comprise a mood for the day. Using RGB for each 5 emotions, a color for the day will be created. This can be tracked for the week, month, year, etc. and can help users track their moods/emotions/feelings through that time. 

# Docker

starting the frontend and backend is now a 1-step process with three commands thanks to docker-compose.

you can now build and run both the frontend and backend with
```
$ docker compose build
$ docker compose up -d      # -d makes it so they run in the background
```

There is also now an option to either use preexisting database data, or initialize a fresh DB of sample data. note that you will want to run this command below before trying to use preexisting data (As there will be no tables the first time)
```
$ RESET_DB=true docker compose up
```

safely stop the frontend and backend with
```
$ docker compose down
```

If you want to see the logs for frontend or backend while running
```
$ docker ps              # displays info about running containers including an id
$ docker logs <id> -f    # Tracks the logs of the specified container (remove -f for a onetime view rather than follow)
ctrl + c                 # Quit following logs
```
