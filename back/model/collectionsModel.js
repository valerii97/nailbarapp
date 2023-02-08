const mongoose = require("mongoose");

const collections = mongoose.connection.db.listCollections();

module.exports = collections;
