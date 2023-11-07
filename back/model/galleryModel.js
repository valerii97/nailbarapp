const mongoose = require("mongoose");

const Gallery = new mongoose.Schema({
  image: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Gallery", Gallery);
