import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';
const API = require('../api.config').API_URL;

const GroupDetailsComponent = () => {
    const { groupId } = useParams();
    const [groupDetails, setGroupDetails] = useState({});
    const [attendeeStudentId, setAttendeeStudentId] = useState('');
    const [loading, setLoading] = useState(true);
    const [studentName, setStudentName] = useState(null);
    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const response = await axios.get(API + `/groups/${groupId}`);
                setGroupDetails(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching group details:', error);
            }
        };



        fetchGroupDetails();
    }, [groupId]);

    const handleRegisterAttendee = async (e) => {
        e.preventDefault();

        // Make API request to register attendee for the given studentId
        try {
            await axios.post(API + '/students/attendees/' + attendeeStudentId, {});
            const student = await axios.get(API + '/students/' + attendeeStudentId);
            setStudentName(student.data.name);
            // Optionally, you can update the students list or show a success message
        } catch (error) {
            console.error('Error registering attendee:', error);
            // Handle error if needed
        }
    };
    if (loading) {
        return (<Loading />);
    }
    return (
        <div className="flex flex-col items-center">
            {/* Top Card - Group Details and Attendee Registration Form */}
            <div className="bg-white p-8 rounded shadow-md w-full mb-8">
                <h2 className="text-2xl font-semibold mb-4">Group Details</h2>
                <div className="flex justify-between">
                    <div>
                        <p className="text-lg font-medium">Group Name: {groupDetails.grade}</p>
                        <p className="text-lg font-medium">Group ID: {groupDetails.id}</p>
                        <div className='inline-flex'>
                            {groupDetails.GroupSchedules.map((schedule) => (
                                <div key={schedule.id} className='rounded-md shadow-md m-2 p-2'>{schedule.day} : {schedule.time}</div>
                            ))}
                        </div>
                    </div>
                    <form onSubmit={handleRegisterAttendee} className="ml-4 inline-block">
                        <label htmlFor="attendeeStudentId" className="block text-sm font-medium text-gray-600">
                            Student ID:
                        </label>
                        <input
                            type="text"
                            id="attendeeStudentId"
                            value={attendeeStudentId}
                            onChange={(e) => setAttendeeStudentId(e.target.value)}
                            className="block mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <button
                            type="submit"
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Register Attendee
                        </button>
                        <Link to={"/absence/" + groupDetails.id} className='no-underline'>
                            <button
                                className="block mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
                            >
                                Today Absence
                            </button>
                        </Link>
                        {studentName && (
                            <p className="mt-2 bg-green-300 align-middle text-center font-medium font-bold rounded  py-2">{studentName}</p>
                        )}
                    </form>
                </div>
            </div>

            {/* Bottom Card - List of Students */}
            <div className="bg-white p-8 rounded shadow-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Students</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b">Student Name</th>
                            <th className="py-2 px-4 border-b">Student ID</th>
                            <th className="py-2 px-4 border-b">Parent Phone</th>
                            <th className="py-2 px-4 border-b">Personal Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupDetails.Students.map((student) => (
                            <tr key={student.studentId} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{student.name}</td>
                                <td className="py-2 px-4 border-b">{student.id}</td>
                                <td className="py-2 px-4 border-b">{student.parentPhoneNumber}</td>
                                <td className="py-2 px-4 border-b">{student.personalPhoneNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default GroupDetailsComponent;
