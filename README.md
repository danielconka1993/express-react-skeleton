# React + Express - skeleton
Skeleton Arevyhs

## React
 - LocalStorage - loginData{loginID, loginName, loginEmail, loginToken}
 - GlobalContext - loginOK, z LocalStorage - loginData{loginID, loginName, loginEmail, loginToken}
 - GlobalReducer
 - SharedLayout 

## Express
 - DB - MongoDB
 - .gitignore neobsahuje .env
 - express má zabezpečení tokenem při loginu (login vyloučen) - express-jwt
 - login, registrace obsahují Hash - crypto
 - nodemon
 - server beží na - process.env.PORT || 5000;

 ## Spuštení
 ### 1. React
 - termánál PowerShell - cd ./client
 - npm install
 - npm start

 ### 2. Express
 - terminál Commend Prompt - cd ./server
 - npm install
 - npm start