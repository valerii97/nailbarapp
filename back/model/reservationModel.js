const mongoose = require("mongoose");

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
  services: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: Date,
  },
});

module.exports = mongoose.model("Reservations", dataReservations);
