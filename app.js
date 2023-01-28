const express = require("express");
const cors = require("cors");
const multipart = require("multer");

const multer = multipart({ dest: "uploads/" });
const { patientRouter, doctorRouter, hospitalRouter, sampleDataRouter } = require("./routes/router")
const { SERVER_PORT } = require('./config/default');

const app = express();

const corsOption = {
    origin: '127.0.0.1'
}
app.use(cors(corsOption));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(multer.array("image"));

app.get('/', (req, res) => {
    res.status(200).json({ status: "OK", message: 'API endpoint is working' })
})

app.use("/patient", patientRouter);
app.use("/hospital", hospitalRouter);
// app.use("/doctor", doctorRouter);
app.use("/sampleData", sampleDataRouter);

app.listen(SERVER_PORT, () => {
    console.log("Web server running on port " + SERVER_PORT);
    console.log("http://localhost:" + SERVER_PORT);
});