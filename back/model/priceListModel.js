const mongoose = require("mongoose");

const Prices = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  price: { required: true, type: Number },
  additional: { type: Boolean },
});

module.exports = mongoose.model("Prices", Prices);
