const express = require("express");
const router = express.Router();

const admin_controller = require("../controller/adminController");

router.get("/", admin_controller.index);

module.exports = router;
