const Price = require("../model/priceListModel");

exports.getPrices = async (req, res) => {
  try {
    const prices = await Price.find({});
    res.status(200).send(prices);
  } catch (e) {
    res.status(500).send({ message: e });
  }
};
