const express = require("express");
const router = express.Router();

const reservation_controller = require("../controller/reservationController");
const review_controller = require("../controller/reviewController");
const gallery_controller = require("../controller/galleryController");
const pricelist_controller = require("../controller/pricelistController");

router.post("/callmeback", reservation_controller.callMeBack);

router.post("/", reservation_controller.index);

router.get("/available", reservation_controller.availableDates);

router.post("/add-price", reservation_controller.createPrice);

router.get("/get-prices", pricelist_controller.getPrices);

router.get("/get-images", gallery_controller.getGalleryImages);

router.post("/review", review_controller.sendReview);

module.exports = router;
