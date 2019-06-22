## Code Challenge

Simple full stack example of creating a nodejs/express based api connected to an external postgres db, and having a react front end that gets compiled and transpiled with webpack and babel respectively. Simple CRUD operations for 'notification' table. Able to access this endpoint on an external endpoint using Heroku.

# To start

- npm install
- npm run webpack
- npm run build-migrate
- npm start

# Pre-requisites

env file contains correct db connects:
* DATABASE_URL 
    * complete URL of db with username, password and port
        * example: postgres://{USER_NAME}:{PASSWORD}@{HOST}:{PORT}/{USER_NAME}
* DATABASE_USER
    * username of user in database
* DATABASE_PW
    * password of user in database
* DATABASE_HOST
    * host of url for database
        * example: raja.db.elephantsql.com
* DATABASE_PORT
    * port of database
* DATABASE_TABLE
    * table name you are accessing

# This is built on
- Webpack
- Express
- ReactJS
- NodeJS
- PostgreSQL
- node-pg-migrate

# API
- getNotifications
    * GET
        * Simple get will return all notifications, can not specify a date range here.
    * POST
        * Simple post will return all notifications, which also accept 2 optional body parameters:
            * start - datetime in which you'd like to get notifications equal or greater than this date. UTC timezone assumed.
                * Uses postgres datetime, example: YYYY-MM-DD HH24:MI:SS
            * end - datetime in which you'd like to get notifications equal or less than this date. UTC timezone assumed.
                * Uses postgres datetime, example: YYYY-MM-DD HH24:MI:SS