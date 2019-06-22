const pg = require('pg')
require('dotenv').config();
//TODO: need to at some point close the client? client.end()

var conString = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PW}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_USER}`;
var client = new pg.Client(conString);

client.connect(function(err) {
    if (err) {
        throw ('could not connect to postgres', err);
    }
});

const endpoints = {
    getAll: () => new Promise((resolve, reject) => {
        client.query(`SELECT * from ${process.env.DATABASE_TABLE}`, function(err, result) {
            if (err) {
                reject(err);
            }
            console.log('logging results length', result.rows.length);
            resolve(result.rows);
        });
    })
}

module.exports = endpoints;