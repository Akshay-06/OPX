const express = require("express")

const { showAllStaffDetails, addStaffController, signInController} = require("../controllers/staffController")

const router = express.Router()

router.get("/allStaff", showAllStaffDetails)
router.post("/addStaff", addStaffController)
router.post("/signin",signInController)
//router.post("/forgot-password", forgotPasswordController)
//router.post("/reset-password/:id/:token", resetPasswordController)

module.exports = router;