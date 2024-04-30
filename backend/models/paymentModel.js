// paymentModel.js

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    txRef: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
    },
    // Add more fields as needed
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
