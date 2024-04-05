const express = require("express")


const { showAllPatientDetails } = require("../controllers/patientController")

const router = express.Router()

router.get("/allPatients",showAllPatientDetails)

module.exports = router;