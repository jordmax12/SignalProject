const pg = require('pg')
require('dotenv').config();
const { createHash } = require('../helpers/hash');
//TODO: need to at some point close the client? client.end()

var conString = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PW}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_USER}`;
var client = new pg.Client(conString);

client.connect(function(err) {
    if (err) {
        throw ('could not connect to postgres', err);
    }
});

const endpoints = {
    getNotifications: (start, end) => new Promise((resolve, reject) => {
        let query = `SELECT * from ${process.env.DATABASE_TABLE} `;
        if (start) query += `WHERE created >= '${start}' `;
        if (end) query += `WHERE created <= '${end}'`;

        client.query(query, function(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    }),
    getById: (id) => new Promise((resolve, reject) => {
        client.query(`SELECT * from ${process.env.DATABASE_TABLE} where id = ${id}`, function(err, result) {
            if (err) {
                reject(err);
            }
            console.log('logging results', result);
            resolve(result.rows);
        });
    }),
    createNotification: (args) => new Promise((resolve, reject) => {
        // Id - string - Unique name - hash - lowercase
        // Name - string - no special chars required
        // Message - string required
        // Link - string optional
        // Type - string optional
        // Created - DateTime required

        let requiredArgs = [
            'name',
            'message'
        ]

        let argsValid = true;

        const defaultType = "Unknown Issue";

        for (var key in args) {
            let arg = args[key];
            if (requiredArgs.indexOf(arg) == -1) {
                argsValid = false;
            }
        }

        if (!argsValid) reject({ error: "Must supply name and message as arguments.", data: null })
        else {
            const { name, message } = args;
            let id = `${name.replace(/ /g, '').toLowerCase()}-${createHash(6)}`
            let data = {
                id,
                name,
                message
            }

            if (args.link) data['link'] = args.link;
            if (args.type) data['type'] = args.type;
            else data['type'] = defaultType;

            if (args.created) {
                //validate date to make sure in UTC format?
                data['created'] = args.created;
            }
            let insert = `insert into notification (id, name, message, type`
            let values = `VALUES (${data.id}, ${data.name}, ${data.message}, ${data.type}`;

            if (data.link) {
                insert = `${insert}, link`
                values = `${values}, ${data.link}`
            }

            if (data.created) {
                insert = `${insert}, created`
                values = `${values}, ${data.created}`
            }

            insert = `${insert})`;
            values = `${values})`;

            let query = insert + ' ' + values;
            console.log(query);
        }
    })
}

module.exports = endpoints;