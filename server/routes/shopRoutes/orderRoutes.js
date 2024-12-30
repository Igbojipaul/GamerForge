const express = require("express")
const { initiatePayment } = require("../../controllers/Payment/orderController")
const { authenticate } = require("../../controllers/authentication/userController")

const router = express.Router()

router.post("/initiatePayment", authenticate, initiatePayment)


module.exports = router