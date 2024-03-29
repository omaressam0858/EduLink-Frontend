import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
const API = require('../api.config').API_URL;


export default function StudentList() {
    // State to hold the fetched data

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API + '/students');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (<Loading />);
    }

    return (
        <div className="bg-white p-8 rounded shadow-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Students</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">Student Name</th>
                        <th className="py-2 px-4 border-b">Student ID</th>
                        <th className="py-2 px-4 border-b">Parent Phone</th>
                        <th className="py-2 px-4 border-b">Personal Phone</th>
                        <th className="py-2 px-4 border-b">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((student) => (
                        <tr key={student.studentId} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{student.name}</td>
                            <td className="py-2 px-4 border-b">{student.id}</td>
                            <td className="py-2 px-4 border-b">{student.parentPhoneNumber}</td>
                            <td className="py-2 px-4 border-b">{student.personalPhoneNumber}</td>
                            <td className="py-2 px-4 border-b">{student.Group.grade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

