const express = require("express")


const { showAllPatientDetails,insertMedicalRecord, signInController } = require("../controllers/patientController")

const router = express.Router()

router.get("/allPatients",showAllPatientDetails)
router.post("/insertMedicalRecord",insertMedicalRecord)
router.post("/signin", signInController)

module.exports = router;