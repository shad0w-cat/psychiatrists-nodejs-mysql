var Doctor = require("../models/doctor.model");
var Hospital = require("../models/hospital.model");
var { query } = require("../services/db.service");

async function showHospitalDetailsPOST(req, res) {
    let hospitalId = req.body.id;
    let result = await showHospitalDetails(hospitalId);
    if (result == "404") {
        res.status(404).json({ message: "Hospital Id not found" });
    }
    else if (result == "500") {
        res.status(500).json({ message: "Server Error" });
    }
    else {
        res.status(200).json({ message: "Success", data: result });
    }
}

async function showHospitalDetailsGET(req, res) {
    let hospitalId = req.params.id;
    let result = await showHospitalDetails(hospitalId);
    if (result == "404") {
        res.status(404).json({ message: "Hospital Id not found" });
    }
    else if (result == "500") {
        res.status(500).json({ message: "Server Error" });
    }
    else {
        res.status(200).json({ message: "Success", data: result });
    }
}

async function showHospitalDetails(id) {
    let customQuery1 = `select * from hospital where id = ${id};`;
    let customQuery2 = `select * from psychiatrist where hospital = ${id};`;
    let result = {};
    let hospital = await query(customQuery1);
    if (hospital.length === 0)
        return 404;
    let hospitalDetail = new Hospital(hospital[0]);
    result.hospitalName = hospitalDetail.name;
    let dList = await query(customQuery2);
    result.PsychiatristDetails = [];
    for (let i = 0; i < dList.length; i++) {
        let doctor = new Doctor(dList[i]);
        let customQuery3 = `select count(*) as count from doctor_patient where doctorId = ${doctor.id};`;
        let patientCount = await query(customQuery3);
        let details = {
            "Id": doctor.id,
            "Name": doctor.name,
            "Patient Count": patientCount[0].count
        };
        result.PsychiatristDetails.push(details);
    }
    return result;
}

module.exports = {
    showHospitalDetailsPOST: showHospitalDetailsPOST,
    showHospitalDetailsGET: showHospitalDetailsGET
}