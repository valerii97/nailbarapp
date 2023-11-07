const Price = require("../model/priceListModel");

exports.index = async (req, res) => {
  try {
    const data = await Price.find({});
    res.status(200).send(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
