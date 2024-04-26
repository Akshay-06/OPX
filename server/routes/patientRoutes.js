const express = require("express")


const { showAllPatientDetails,insertMedicalRecord, signInController, getMedicalRecords, getPatientInvoices } = require("../controllers/patientController")

const router = express.Router()

router.get("/allPatients",showAllPatientDetails)
router.post("/insertMedicalRecord",insertMedicalRecord)
router.post("/signin", signInController)
router.get("/viewMedicalRecord", getMedicalRecords)
router.get("/viewInvoices", getPatientInvoices)

module.exports = router;