# CircleTube

this project has a purpose, service livestream on webcam video. On what the file is created on server, in format .mp4 in the folder /uploads

# How this project works

Are two applications backend and frontend, running in two diferents doors. Backend is API for get file blob(video generate in frontend) and save this file in folder /uploads. Finally Frontend Application serve UI, show button for record video in webcam and showing preview image if user stop record the file generate is send to backend.

# Required Technologies

- NodeJs instaled;
- Yarn instaled;
- Docker;
- Docker-compose;
- Have a Webcam plugged in PC;

# instructions of execution of this project

- go to root folder and digit this command in a terminal 'docker-compose up --build';
- wait for install dependencies from container and frontend execute server page;

# To rerun project again, with no build in docker-compose

- docker-compose up

# Page of Application Frontend

- localhost:3000

# Page of Application BackEnd(API)

- localhost:5000

