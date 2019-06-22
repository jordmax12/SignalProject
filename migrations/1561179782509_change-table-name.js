exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.renameTable("notificationTable", "notification")
};

exports.down = (pgm) => {

};