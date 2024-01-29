import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API = "http://localhost:3000/api";

const StudentAdd = () => {
    const [groups, setGroups] = useState([]);
    const [studentDetails, setStudentDetails] = useState({
        name: '',
        parentPhoneNumber: '',
        personalPhoneNumber: '',
        groupId: '',
    });

    useEffect(() => {
        // Fetch groups when the component mounts
        const fetchGroups = async () => {
            try {
                const response = await axios.get(API + '/groups');
                setGroups(response.data); // Assuming the response is an array of groups
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleRegisterStudent = async (e) => {
        e.preventDefault();

        // Make API request to register the student
        try {
            await axios.post(API + '/students', studentDetails);

            setStudentDetails({
                name: '',
                parentPhoneNumber: '',
                personalPhoneNumber: '',
                groupId: '',
            });
        } catch (error) {
            console.error('Error registering student:', error);
            // Handle error if needed
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Student Registration</h2>
                <form onSubmit={handleRegisterStudent}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                            Student Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={studentDetails.name}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="parentPhoneNumber" className="block text-sm font-medium text-gray-600">
                            Parent Phone Number:
                        </label>
                        <input
                            type="text"
                            id="parentPhoneNumber"
                            name="parentPhoneNumber"
                            value={studentDetails.parentPhoneNumber}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="personalPhoneNumber" className="block text-sm font-medium text-gray-600">
                            Personal Phone Number:
                        </label>
                        <input
                            type="text"
                            id="personalPhoneNumber"
                            name="personalPhoneNumber"
                            value={studentDetails.personalPhoneNumber}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="groupId" className="block text-sm font-medium text-gray-600">
                            Select Group:
                        </label>
                        <select
                            id="groupId"
                            name="groupId"
                            value={studentDetails.groupId}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="" disabled>
                                Choose a group
                            </option>
                            {groups.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.grade}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Register Student
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentAdd;
