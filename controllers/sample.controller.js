const { sampleData } = require("../services/db.service");

async function sampleDataCreation(req, res) {
    await sampleData();
    res.status(201).json({ message: "Sample Data Created" })
}

module.exports = sampleDataCreation;