## Code Challenge
Simple full stack example of creating a nodejs/express based api connected to an external postgres db, and having a react front end that gets compiled and transpiled with webpack and babel respectively. Simple CRUD operations for 'notification' table. Able to access this endpoint on an external endpoint using Heroku.

# Live Site
* https://signal-code-challenge.herokuapp.com

# API
* https://signal-code-challenge.herokuapp.com/api (See below for API endpoints)

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
- api/getNotifications
    * GET
        * TODO: Simple get will return all notifications, optional query parameters
            * start - datetime in which you'd like to get notifications equal or greater than this date. UTC timezone assumed.
                * Uses postgres datetime, example: YYYY-MM-DD HH24:MI:SS (in ISO format)
            * end - datetime in which you'd like to get notifications equal or less than this date. UTC timezone assumed.
                * Uses postgres datetime, example: YYYY-MM-DD HH24:MI:SS (in ISO format)
        * examples
            * curl -X GET \
                https://signal-code-challenge.herokuapp.com/api/getNotifications?start={2019-06-20T13:54:55Z}&end={2019-06-24T13:54:55Z} \
                -H 'Accept: */*' \
                -H 'Cache-Control: no-cache' \
                -H 'Connection: keep-alive' \
                -H 'Host: signal-code-challenge.herokuapp.com' \
                -H 'Postman-Token: 26b3b12d-e35c-42f0-92c6-8d7ee86c85a4,796b4ced-77cf-472d-8da0-c14ffb635f71' \
                -H 'User-Agent: PostmanRuntime/7.15.0' \
                -H 'accept-encoding: gzip, deflate' \
                -H 'cache-control: no-cache'
    * POST
        * Simple post will return all notifications, which also accept 2 optional body parameters:
            * start - datetime in which you'd like to get notifications equal or greater than this date. UTC timezone assumed.
                * Uses postgres datetime, example: YYYY-MM-DD HH24:MI:SS (in ISO format)
            * end - datetime in which you'd like to get notifications equal or less than this date. UTC timezone assumed.
                * Uses postgres datetime, example: YYYY-MM-DD HH24:MI:SS (in ISO format)
        * examples
            * curl -X POST \
            https://signal-code-challenge.herokuapp.com/api/getNotifications \
            -H 'Accept: */*' \
            -H 'Cache-Control: no-cache' \
            -H 'Connection: keep-alive' \
            -H 'Content-Type: application/json' \
            -H 'Host: signal-code-challenge.herokuapp.com' \
            -H 'User-Agent: PostmanRuntime/7.15.0' \
            -H 'accept-encoding: gzip, deflate' \
            -H 'cache-control: no-cache' \
            -H 'content-length: 94' \
            -d '{"start": "2019-06-20T13:54:55Z", "end": "2019-06-24T13:54:55Z"}'

- api/createNotification
    * POST
        * Required raw body json parameters (as raw body json)
            * name, message
        * Optional body parameters
            * link
                * if no link is provided, we wont display a link on the frontend
            * type
                * if no type is provided, we default to "Unknown Issue"
            * created (ISO UTC)
                * if created is provided, we default to current time, UTC
    * example
        * curl -X POST \
            https://signal-code-challenge.herokuapp.com/api/createNotification \
            -H 'Accept: */*' \
            -H 'Cache-Control: no-cache' \
            -H 'Connection: keep-alive' \
            -H 'Content-Type: application/json' \
            -H 'Host: signal-code-challenge.herokuapp.com' \
            -H 'User-Agent: PostmanRuntime/7.15.0' \
            -H 'accept-encoding: gzip, deflate' \
            -H 'cache-control: no-cache' \
            -H 'content-length: 94' \
            -d '{"name": "curlTest", "message": "curlTest", "link": "https://google.com", "type": "curl-test"}'
- api/getNotification
    * POST
        * Required raw body json parameters (as raw body json)
            * id
    * GET
        * Required query string parameters
            * id
    * examples
        * GET
            * curl -X GET \
                https://signal-code-challenge.herokuapp.com/api/getNotification?id={notificationID} \
                -H 'Accept: */*' \
                -H 'Cache-Control: no-cache' \
                -H 'Connection: keep-alive' \
                -H 'Content-Type: application/json' \
                -H 'Host: signal-code-challenge.herokuapp.com' \
                -H 'User-Agent: PostmanRuntime/7.15.0' \
                -H 'accept-encoding: gzip, deflate' \
                -H 'cache-control: no-cache' \
                -H 'content-length: 94' \'
        * POST
            * curl -X POST \
            https://signal-code-challenge.herokuapp.com/api/getNotification \
            -H 'Accept: */*' \
            -H 'Cache-Control: no-cache' \
            -H 'Connection: keep-alive' \
            -H 'Content-Type: application/json' \
            -H 'Host: signal-code-challenge.herokuapp.com' \
            -H 'User-Agent: PostmanRuntime/7.15.0' \
            -H 'accept-encoding: gzip, deflate' \
            -H 'cache-control: no-cache' \
            -H 'content-length: 94' \
            -d '{"id": "{notificationID}"}'
- api/updateNotification
    * POST
        * Required raw body json parameters (as raw body json)
            * id
        * Optional (but at least 1)
            * name, message, link, type (these will be udpated, must provide at least 1 to update)
    * example
        * curl -X POST \
            https://signal-code-challenge.herokuapp.com/api/updateNotification \
            -H 'Accept: */*' \
            -H 'Cache-Control: no-cache' \
            -H 'Connection: keep-alive' \
            -H 'Content-Type: application/json' \
            -H 'Host: signal-code-challenge.herokuapp.com' \
            -H 'User-Agent: PostmanRuntime/7.15.0' \
            -H 'accept-encoding: gzip, deflate' \
            -H 'cache-control: no-cache' \
            -H 'content-length: 94' \
            -d '{"id": "{notificationID}"}'
- api/deleteNotification
    * POST
        * Required raw body json parameters (as raw body json)
            * id
    * example
        * curl -X POST \
            https://signal-code-challenge.herokuapp.com/api/deleteNotification \
            -H 'Accept: */*' \
            -H 'Cache-Control: no-cache' \
            -H 'Connection: keep-alive' \
            -H 'Content-Type: application/json' \
            -H 'Host: signal-code-challenge.herokuapp.com' \
            -H 'User-Agent: PostmanRuntime/7.15.0' \
            -H 'accept-encoding: gzip, deflate' \
            -H 'cache-control: no-cache' \
            -H 'content-length: 94' \
            -d '{"id": "{notificationID}"}'


# DB Types
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

# Client Routes
- /
    * home page
- /detail/:id
    * detail page passing in the id of the row from DB.
- /create
    * create notification page
