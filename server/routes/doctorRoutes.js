const express = require("express")

const { signInController, createPrescription} = require("../controllers/doctorController")
const { insertMedicalRecord, getMedicalRecords } = require("../controllers/patientController")

const router = express.Router()

router.post("/signin", signInController)
router.post("/prescription", createPrescription)
router.post("/insertPatientRecord", insertMedicalRecord)
router.get("/viewPatientRecord", getMedicalRecords)

module.exports = router;