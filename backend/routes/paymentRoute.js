
const express = require("express");
const router = express.Router();
const { initiatePayment, verifyPayment, paymentSuccess } = require("../controllers/paymentController");

// Define routes
router.post("/initiate-payment", initiatePayment);
router.get("/verify-payment/:id", verifyPayment);
router.get("/payment-success", paymentSuccess);

module.exports = router;
