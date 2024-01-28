import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
const API = "http://localhost:3000/api";


export default function GroupList() {
    // State to hold the fetched data

    const [data, setData] = useState(null);
    // State to track loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API + '/groups');
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

    const nowHour = new Date().getHours();
    const nowDay = new Date().toLocaleDateString('en-US', {weekday: 'long'})


    return (
        <div>
            {data.map((group) => (
                <Link className='text-black' to={"/groups/" + group.id} key={group.id}>
                    <div className="bg-white p-4 shadow-md rounded-md m-4" key={group.id} >
                        <h2 className="text-xl font-semibold mb-2">{group.grade}</h2>
                        <div className='inline-flex'>
                            {group.GroupSchedules.map((schedule) => (
                                <div key={schedule.id} className={nowHour === schedule.time && nowDay === schedule.day ? 'bg-green-300 rounded-md shadow-md m-2 p-2' : 'rounded-md shadow-md m-2 p-2'}>{schedule.day} : {schedule.time}</div>
                            ))}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );

}

