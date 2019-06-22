exports.shorthands = undefined;

const tableName = "notificationTable";

exports.up = (pgm) => {
    pgm.createTable(tableName, {
        id: "id",
        name: { type: "varchar(1000)", notNull: true },
        message: { type: "varchar(1000)", notNull: true },
        link: { type: "varchar(1000)", notNull: true },
        type: { type: "varchar(1000)", notNull: true },
        created: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp")
        }
    })
    pgm.createIndex(tableName);
};

exports.down = (pgm) => {

};