const express = require("express")

const { signInController, createPrescription } = require("../controllers/doctorController")

const router = express.Router()

router.post("/signin", signInController)
router.post("/prescription", createPrescription)

module.exports = router;