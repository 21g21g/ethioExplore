const axios = require("axios").default;
require("dotenv").config();
const CHAPA_AUTH = process.env.CHAPA_URL || 'CHASECK_TEST-5XdTKYhUcOcKsVdjYeZVBzLSiSZT4yf7';
const CHAPA_URL = process.env.CHAPA_URL || "https://api.chapa.co/v1/transaction/initialize";
// Controller method for initiating payment
exports.initiatePayment = async (req, res) => {
    try {
        // chapa redirect you to this url when payment is successful
        const CALLBACK_URL = "http://localhost:5000/api/payment/verify-payment/";
        const RETURN_URL = "http://localhost:5000/api/payment/payment-success/";

        // a unique reference given to every transaction
        const TEXT_REF = "tx-myecommerce12345-" + Date.now();
        // form data
        const data = {
            amount: '10',
            currency: 'ETB',
            email: 'eyuelkassahun3@gmail.com',
            first_name: 'eyuel',
            last_name: 'kassahun',
            tx_ref: TEXT_REF,
            callback_url: CALLBACK_URL + TEXT_REF,
            return_url: RETURN_URL
        };

        // post request to chapa
        const response = await axios.post(CHAPA_URL, data);

        // Redirect to Chapa checkout URL
        res.redirect(response.data.data.checkout_url);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error initiating payment" });
    }
};



// Define the function to verify payment
exports.verifyPayment = async (req, res) => {
    try {
        // Construct the request header with Chapa authorization token
        const config = {
            headers: {
                Authorization: `Bearer ${CHAPA_AUTH}`
            }
        };

        // Make a GET request to Chapa API to verify the payment with the provided ID
        await axios.get(`https://api.chapa.co/v1/transaction/verify/${req.params.id}`, config);

        // Handle the response from Chapa API
        console.log("Payment was successfully verified");
        res.sendStatus(200);
    } catch (error) {
        // Handle errors that occur during the verification process
        console.error("Payment verification failed:", error);
        res.status(500).send("Payment verification failed");
    }
};
//successfull payment
exports.paymentSuccess = async (req, res) => {
    try {
        // Perform any necessary actions upon successful payment
        console.log("Payment was successful");

        // Respond with a success message
        res.status(200).json({ message: "Payment was successful" });
    } catch (error) {
        console.error("Error handling payment success:", error);
        res.status(500).json({ error: "Error handling payment success" });
    }
};
