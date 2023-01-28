var Patient = require("../models/patient.model");
var fs = require("fs/promises");
const { query } = require("../services/db.service");
async function createPatient(req, res) {
    var patient = new Patient(req.body)
    let errFlag = [];
    if (!patient.name) {
        errFlag = [...errFlag, "address"];
    }
    if (!patient.address || patient.address.length < 10) {
        errFlag = [...errFlag, "address"];
    }
    if (!patient.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(patient.email)) {
        errFlag = [...errFlag, "email"];
    }
    if (!patient.phone || !/^([+]91)([\d]+){10}$/.test(patient.phone)) {
        errFlag = [...errFlag, "phone"];
    }
    if (!patient.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/.test(patient.password)) {
        errFlag = [...errFlag, "password"];
    }
    if (req.files.length <= 0) {
        errFlag = [...errFlag, "image"];
    }
    else {
        patient.image = req.files[0].originalname;
        await fs.rename(`uploads/${req.files[0].filename}`, `uploads/${req.files[0].originalname}`);
    }
    if (errFlag.length === 0) {
        let insertQuery = `insert into patients (name, address, email, phone, password, image) values ('${patient.name}','${patient.address}','${patient.email}','${patient.phone}','${patient.password}','${patient.image}')`;
        console.log(insertQuery);
        var data = await query(insertQuery);
        if (data) res.status(201).json({ message: "Success" });
        else res.status(500).json({ message: "Server error" });
    }
    else {
        res.status(400).send(JSON.stringify({ "message": "Invalid " + errFlag.join(", ") }));
    }

}

module.exports = {
    createPatient: createPatient
}