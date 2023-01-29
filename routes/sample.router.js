const express = require("express");
const router = express.Router();

var sampleDataCreation = require("../controllers/sample.controller.js");

router.route("/").get(sampleDataCreation)

module.exports = router;