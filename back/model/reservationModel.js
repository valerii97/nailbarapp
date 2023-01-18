const mongoose = require("mongoose");
const avDatesModel = require("./availableDatesModel");

const dataReservations = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  date: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "validdates",
  },
});

module.exports = mongoose.model("Reservations", dataReservations);
