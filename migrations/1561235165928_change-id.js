exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.alterColumn('notification', 'id', {
        type: "varchar(1000)",
        notNull: true
    })
};

exports.down = (pgm) => {

};