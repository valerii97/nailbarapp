const mongoose = require("mongoose");

const Review = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  rate: {
    required: true,
    type: String,
  },
  feedback: {
    type: String,
  },
});

module.exports = mongoose.model("Review", Review);
