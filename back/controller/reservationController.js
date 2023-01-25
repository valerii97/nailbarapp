const Reservation = require("../model/reservationModel");
const avDates = require("../model/availableDatesModel");
const telegabot = require("../model/telega");
const Price = require("../model/priceListModel");
const Gallery = require("../model/galleryModel");
const Review = require("../model/reviewsModel");

const telega = async (req) => {
  const { name, email, phone, pickedDate } = req.body;
  const date = await avDates.findOne({ _id: pickedDate });
  let telegamsg = `New reservation!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date.date.toLocaleString()}`;
  telegabot.bot.sendMessage("472359032", telegamsg);
};

exports.index = async (req, res) => {
  const { name, email, phone, pickedDate } = req.body;
  const data = new Reservation({
    name: name,
    email: email,
    phone: phone,
    date: pickedDate,
  });
  try {
    await avDates.findOne({ _id: pickedDate }).updateOne({ busy: true });
    await data.save();
    telega(req);
    res.status(200).send({ message: "Reservation succefuly made!" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.available = async (req, res) => {
  try {
    const availableDates = await avDates
      .find({ busy: false })
      .sort({ date: 1 });

    res.send(availableDates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.callMeBack = (req, res) => {
  try {
    const { name, callbackphoneinput } = req.body;
    let telegamsg = `Hello!\nMy name is ${name}\nPls, call me back on number: ${callbackphoneinput}`;
    telegabot.bot.sendMessage("472359032", telegamsg);
    res.status(200).send({ message: "Message succesfully sent!" });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

exports.createPrice = async (req, res) => {
  try {
    const { pricetitle, priceprice } = req.body;

    const data = new Price({
      title: pricetitle,
      price: priceprice,
    });
    await data.save();
    res.status(200).send({ message: "request received" });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

exports.getPrices = async (req, res) => {
  try {
    const prices = await Price.find({});
    const images = await Gallery.find({});
    res.status(200).send({ prices, images });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

exports.sendReview = async (req, res) => {
  const { name, email, rate, feedback } = req.body;
  const data = new Review({
    name: name,
    email: email,
    rate: rate,
    feedback: feedback,
  });
  try {
    await data.save();
    res.status(200).send({ message: "Review saved succesfully!" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
