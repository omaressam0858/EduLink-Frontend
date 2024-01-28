import React, { useState } from 'react';
import axios from 'axios';
const API = "http://localhost:3000/api";


export default function CreateGroup() {
    // State to manage input values
    const [grade, setGrade] = useState('');
    const [paymentPrice, setPaymentPrice] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create data object to send in the POST request
        const data = {
            grade: grade,
            paymentPrice: paymentPrice,
        };

        try {
            // Make POST request using Axios
            const response = await axios.post(API + '/groups', data);

            // Handle success if needed
            setSuccess(true);
            if(response.status !== 200) return new Error(response.message)
            console.log('API response:', response.data);
        } catch (error) {
            // Handle error if needed
            setError(error);
            console.error('Error making API request:', error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Create New Group</h2>
                <form onSubmit={handleSubmit}>
                    {success && (
                        <p className="text-green-500 mb-4">Group created successfully.</p>
                    )}

                    {error && (
                        <p className="text-red-500 mb-4">
                            {error.message}
                        </p>
                    )}
                    <div className="mb-4">
                        <label htmlFor="grade" className="block text-sm font-medium text-gray-600">
                            Grade:
                        </label>
                        <input
                            type="text"
                            id="grade"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="paymentPrice" className="block text-sm font-medium text-gray-600">
                            Payment Price:
                        </label>
                        <input
                            type="number"
                            id="paymentPrice"
                            value={paymentPrice}
                            onChange={(e) => setPaymentPrice(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );

};

