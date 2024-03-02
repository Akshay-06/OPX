const express = require("express")

const { showAllStaffDetails, addStaffController, signInController} = require("../controllers/staffController")
const { registerPatientController } = require("../controllers/patientController")
const { registerDoctorController } = require("../controllers/doctorController")
const {showAllServiceDetails, addService, updateService,deleteService} = require("../controllers/serviceController")

const router = express.Router()

router.get("/allStaff", showAllStaffDetails)
router.post("/addStaff", addStaffController)
router.post("/signin", signInController)
router.post("/register-patient",registerPatientController)
router.post("register-doctor",registerDoctorController)
router.get("/allServiceDetails", showAllServiceDetails)
router.post("/addService", addService)
router.post("/updateService",updateService)
router.post("/deleteService",deleteService)
//router.post("/forgot-password", forgotPasswordController)
//router.post("/reset-password/:id/:token", resetPasswordController)

module.exports = router;