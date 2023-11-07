const mongoose = require("mongoose");

const dataDates = new mongoose.Schema({
  date: {
    required: true,
    type: Date,
  },
  busy: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("validdates", dataDates);
