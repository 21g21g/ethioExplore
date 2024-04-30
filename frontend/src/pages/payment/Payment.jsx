import React, { useState } from "react";
import axios from "axios";

function Payment() {
    const [paymentData, setPaymentData] = useState({
        amount: "",
        currency: "",
        email: "",
        firstName: "",
        lastName: "",
        txRef: "",
    });

    const [paymentDetails, setPaymentDetails] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/payment/initiate-payment", paymentData);
            setPaymentDetails(response.data.payment);
        } catch (error) {
            setError("Error initiating payment");
        }
    };

    const handleReset = () => {
        setPaymentData({
            amount: "",
            currency: "",
            email: "",
            firstName: "",
            lastName: "",
            txRef: "",
        });
        setPaymentDetails(null);
        setError(null);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">Make Payment</h1>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label className="block mb-1">Amount:</label>
                        <input
                            type="number"
                            name="amount"
                            value={paymentData.amount}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Currency:</label>
                        <input
                            type="text"
                            name="currency"
                            value={paymentData.currency}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={paymentData.email}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={paymentData.firstName}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={paymentData.lastName}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Transaction Reference:</label>
                        <input
                            type="text"
                            name="txRef"
                            value={paymentData.txRef}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>
                </div>
                <div className="mt-4 space-x-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Pay Now
                    </button>
                    <button type="button" onClick={handleReset} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">
                        Reset
                    </button>
                </div>
            </form>
            {error && <p className="text-red-600 mt-4">{error}</p>}
            {paymentDetails && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold">Payment Details</h2>
                    <p>Amount: {paymentDetails.amount}</p>
                    <p>Currency: {paymentDetails.currency}</p>
                    <p>Email: {paymentDetails.email}</p>
                    <p>First Name: {paymentDetails.firstName}</p>
                    <p>Last Name: {paymentDetails.lastName}</p>
                    <p>Transaction Reference: {paymentDetails.txRef}</p>
                </div>
            )}
        </div>
    );
}

export default Payment;
