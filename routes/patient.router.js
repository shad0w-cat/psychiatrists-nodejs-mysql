const express = require("express");
const router = express.Router();

var { createPatient } = require("../controllers/patient.controller.js");

router.route("/").post(createPatient)

module.exports = router;