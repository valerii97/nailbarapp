const Review = require("../model/reviewsModel");

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
