const mongoose = require("mongoose");

const Prices = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  price: { required: true, type: Number },
  additional: { type: Boolean },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Prices", Prices);
