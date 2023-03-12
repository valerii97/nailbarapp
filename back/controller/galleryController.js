const Gallery = require("../model/galleryModel");

exports.getGalleryImages = async (req, res) => {
  try {
    const galleryImages = await Gallery.find({});
    res.status(200).send(galleryImages);
  } catch (e) {
    res.status(500).send({ message: e });
  }
};
