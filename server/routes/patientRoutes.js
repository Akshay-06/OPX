const express = require("express")


const { showAllPatientDetails,insertMedicalRecord } = require("../controllers/patientController")

const router = express.Router()

router.get("/allPatients",showAllPatientDetails)
router.post("/insertMedicalRecord",insertMedicalRecord)

module.exports = router;