const express = require("express");
const router = express.Router();

const reservation_controller = require("../controller/reservationController");

router.post("/callmeback", reservation_controller.callMeBack);

router.post("/", reservation_controller.index);

router.get("/available", reservation_controller.available);

router.post("/add-price", reservation_controller.createPrice);

router.get("/get-prices", reservation_controller.getPrices);

router.post("/review", reservation_controller.sendReview);

module.exports = router;
