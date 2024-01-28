import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GroupDetailsComponent = () => {
  const { groupId } = useParams();
  const [groupDetails, setGroupDetails] = useState({});
  const [students, setStudents] = useState([]);
  const [attendeeStudentId, setAttendeeStudentId] = useState('');

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`your-api-endpoint/groups/${groupId}`);
        setGroupDetails(response.data);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await axios.get(`your-api-endpoint/groups/${groupId}/students`);
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchGroupDetails();
    fetchStudents();
  }, [groupId]);

  const handleRegisterAttendee = async (e) => {
    e.preventDefault();

    // Make API request to register attendee for the given studentId
    try {
      const response = await axios.post(`your-api-endpoint/groups/${groupId}/register-attendee`, {
        studentId: attendeeStudentId,
      });
      console.log('Attendee registration successful:', response.data);

      // Optionally, you can update the students list or show a success message
    } catch (error) {
      console.error('Error registering attendee:', error);
      // Handle error if needed
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Top Card - Group Details and Attendee Registration Form */}
      <div className="bg-white p-8 rounded shadow-md w-full mb-8">
        <h2 className="text-2xl font-semibold mb-4">Group Details</h2>
        <div className="flex justify-between">
          <div>
            <p className="text-lg font-medium">Group Name: {groupDetails.groupName}</p>
            <p className="text-lg font-medium">Group ID: {groupDetails.groupId}</p>
          </div>
          <form onSubmit={handleRegisterAttendee} className="ml-4">
            <label htmlFor="attendeeStudentId" className="block text-sm font-medium text-gray-600">
              Student ID:
            </label>
            <input
              type="text"
              id="attendeeStudentId"
              value={attendeeStudentId}
              onChange={(e) => setAttendeeStudentId(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Register Attendee
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Card - List of Students */}
      <div className="bg-white p-8 rounded shadow-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Students</h2>
        <ul>
          {students.map((student) => (
            <li key={student.studentId} className="mb-4">
              <p className="text-lg font-medium">Student Name: {student.studentName}</p>
              <p className="text-lg font-medium">Student ID: {student.studentId}</p>
              <p className="text-lg font-medium">Parent Phone: {student.parentPhone}</p>
              <p className="text-lg font-medium">Personal Phone: {student.personalPhone}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GroupDetailsComponent;
