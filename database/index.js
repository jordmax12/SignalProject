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
        if (!start && end) query += `WHERE created <= '${end}'`;
        if (start && end) query += `AND created <= '${end}'`;
        client.query(query, function(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    }),
    getById: (id) => new Promise((resolve, reject) => {
        client.query(`SELECT * from ${process.env.DATABASE_TABLE} where id = '${id}'`, function(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows.shift());
            }
        });
    }),
    updateNotification: (args) => new Promise((resolve, reject) => {
        if (!args.id) reject("Must supply id")
        else if (Object.keys(args).length == 1) reject("Nothing to update")
        else {
            let query = 'UPDATE notification SET';
            const id = args.id;
            delete args.id;
            let i = 0;
            let count = Object.keys(args).length;
            for (var key in args) {
                i++;
                if (key != 'id') {
                    query += ` ${key}='${args[key]}'${i == count ? '' : ','} `;
                }
            }

            query += `WHERE id = '${id}'`;
            client.query(query, function(err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        }

    }),
    deleteNotification: (id) => new Promise((resolve, reject) => {
        client.query(`delete from ${process.env.DATABASE_TABLE} where id = '${id}'`, function(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
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

        let argsValid = false;

        const defaultType = "Unknown Issue";

        for (var key in args) {
            if (requiredArgs.indexOf(key) > -1) {
                requiredArgs = requiredArgs.filter(arg => arg != key);
            }
        }

        if (requiredArgs.length > 0) reject({ error: "Must supply name and message as arguments.", data: null })
        else {
            const { name, message } = args;
            let id = `${name.replace(/ /g, '').toLowerCase()}-${createHash(6).toLowerCase()}`
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
            let values = `VALUES ('${data.id}', '${data.name}', '${data.message}', '${data.type}'`;

            if (data.link) {
                insert = `${insert}, link`
                values = `${values}, '${data.link}'`
            }

            if (data.created) {
                insert = `${insert}, created`
                values = `${values}, '${data.created}'`
            }

            insert = `${insert})`;
            values = `${values})`;

            let query = insert + ' ' + values;

            client.query(query, function(err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        }
    })
}

module.exports = endpoints;;