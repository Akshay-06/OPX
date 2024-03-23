const express = require("express")


const { signInController } = require("../controllers/doctorController")

const router = express.Router()

router.post("/signin", signInController)

module.exports = router;