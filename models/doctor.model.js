'use strict';

var db = require("../services/db.service");

class Doctor {

    constructor(doctor) {
        this.id = doctor.id;
        this.name = doctor.name;
        this.hospital = doctor.hospital;
    }
}

module.exports = Doctor;