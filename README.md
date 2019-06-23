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
        * TODO: Simple get will return all notifications, optional query parameters
            * start - datetime in which you'd like to get notifications equal or greater than this date. UTC timezone assumed.
                * Uses postgres datetime, example: YYYY-MM-DD HH24:MI:SS (in ISO format)
            * end - datetime in which you'd like to get notifications equal or less than this date. UTC timezone assumed.
                * Uses postgres datetime, example: YYYY-MM-DD HH24:MI:SS (in ISO format)
    * POST
        * Simple post will return all notifications, which also accept 2 optional body parameters:
            * start - datetime in which you'd like to get notifications equal or greater than this date. UTC timezone assumed.
                * Uses postgres datetime, example: YYYY-MM-DD HH24:MI:SS (in ISO format)
            * end - datetime in which you'd like to get notifications equal or less than this date. UTC timezone assumed.
                * Uses postgres datetime, example: YYYY-MM-DD HH24:MI:SS (in ISO format)
- createNotification
    * POST
        * Required body parameters
            * name message
        * Optional body parameters
            * link
                * if no link is provided, we wont display a link on the frontend
            * type
                * if no type is provided, we default to "Unknown Issue"
            * created (ISO UTC)
                * if created is provided, we default to current time, UTC

# Types
- Notification
    * id
        * auto generated using the name (stripped of whitespace and made lowercase) + a 6 digit hash.
            * example: somethingbadhappened-thgh26
    * name
        * varchar(1000)
            * example: Something Bad Happened
    * message
        * varchar(1000)
            * example: This is a message that describes the issue in more detail.
    * link
        * varchar(1000)
            * example: https://google.com
    * type
        * varchar(1000)
            * example: "Data Issue" or "Config Issue"
    * created
        * timestamptz
            * example: 2019-06-23T01:49:00.000Z

# Routes
- /
    * home page
- /detail/:id
    * detail page passing in the id of the row from DB.
- /create
    * create notification page
