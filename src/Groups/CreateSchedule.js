import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
const API = "http://localhost:3000/api";


const CreateSchedule = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [loading, setLoading] = useState(true);
    const daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

    useEffect(() => {
        // Fetch groups when the component mounts
        const fetchGroups = async () => {
            try {
                const response = await axios.get(API + '/groups');
                setGroups(response.data); // Assuming the response is an array of groups
                setLoading(false); // Set loading to false once data is fetched

            } catch (error) {
                console.error('Error fetching groups:', error);
                setLoading(false); // Set loading to false on error as well
            }
        };

        fetchGroups();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            groupId: selectedGroup,
            day: selectedDay,
            time: selectedTime,
        };

        try {
            setLoading(true); // Set loading to true before making the API request
            const response = await axios.post(API + "/groups/schedule", data);
            console.log('API response:', response.data);

            // Optionally, you can reset the form after successful submission
            setSelectedDay('');
            setSelectedTime('');
        } catch (error) {
            console.error('Error making API request:', error);
        } finally {
            setLoading(false); // Set loading to false after the API request is completed
        }
    };
    if (loading) {
        return (<Loading />);
    }
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Create Group Schedule</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="group" className="block text-sm font-medium text-gray-600">
                            Select Group:
                        </label>
                        <select
                            id="group"
                            value={selectedGroup}
                            onChange={(e) => setSelectedGroup(e.target.value)}
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
                    <div className="mb-4">
                        <label htmlFor="day" className="block text-sm font-medium text-gray-600">
                            Select Day:
                        </label>
                        <select
                            id="day"
                            value={selectedDay}
                            onChange={(e) => setSelectedDay(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="" disabled>
                                Choose a day
                            </option>
                            {daysOfWeek.map((day) => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="time" className="block text-sm font-medium text-gray-600">
                            Select Time (0-24):
                        </label>
                        <input
                            type="number"
                            id="time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="e.g., 14:30"
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


export default CreateSchedule;
