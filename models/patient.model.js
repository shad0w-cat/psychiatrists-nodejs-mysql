'use strict';

class Patient {
    constructor(patient) {
        this.id = patient.id;
        this.name = patient.name;
        this.address = patient.address;
        this.email = patient.email;
        this.phone = patient.phone;
        this.password = patient.password;
        this.image = patient.image;
    }
}

module.exports = Patient;