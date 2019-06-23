exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.alterColumn('notification', 'created', {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("current_timestamp")
    })
};

exports.down = (pgm) => {

};