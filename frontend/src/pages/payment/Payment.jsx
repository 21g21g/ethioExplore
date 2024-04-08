import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        amount: 0,
        fullName: '',
        email: '',
        phoneNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Perform payment processing with Chapa API
            const response = await axios.post('http://chapa-api-url.com/process-payment', paymentDetails);
            console.log(response.data);
            // Handle success or error response from Chapa
        } catch (error) {
            console.error('Error processing payment:', error);
            // Handle error
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="max-w-md w-full p-8 bg-white rounded-md shadow-md">
                <h2 className="text-2xl mb-6 text-center">Payment Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="cardNumber" className="block text-gray-700">Card Number</label>
                        <input type="text" id="cardNumber" name="cardNumber" value={paymentDetails.cardNumber} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="expiryDate" className="block text-gray-700">Expiry Date</label>
                        <input type="text" id="expiryDate" name="expiryDate" value={paymentDetails.expiryDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cvv" className="block text-gray-700">CVV</label>
                        <input type="text" id="cvv" name="cvv" value={paymentDetails.cvv} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-gray-700">Amount</label>
                        <input type="number" id="amount" name="amount" value={paymentDetails.amount} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
                        <input type="text" id="fullName" name="fullName" value={paymentDetails.fullName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input type="email" id="email" name="email" value={paymentDetails.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
                        <input type="tel" id="phoneNumber" name="phoneNumber" value={paymentDetails.phoneNumber} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Submit Payment</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Payment;
