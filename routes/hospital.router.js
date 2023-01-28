const express = require("express");
const router = express.Router();

var { showHospitalDetailsPOST, showHospitalDetailsGET } = require("../controllers/hospital.controller.js");

router.route("/").post(showHospitalDetailsPOST);
router.route("/:id").get(showHospitalDetailsGET);

module.exports = router;