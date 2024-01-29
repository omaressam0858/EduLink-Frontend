import { useState } from 'react';
import QrReader from 'react-qr-reader';
import axios from 'axios';
const API = require('../api.config').API_URL;
export default function QRScanner() {
    const [StudentData, setStudentData] = useState(null);
    const [scanned, setScanned] = useState(false);

    const sendIdToApi = (id) => {
        console.log(id)
        axios.post(API + '/students/attendees/' + id, {})
            .then(response => {
                setStudentData(response.data);
            })
            .catch(error => {
                console.error('API Error:', error);
            });
    };

    function handleScan(result) {
        if (result && !scanned) {
            setScanned(true);
            sendIdToApi(result);
        }
    }
    function handleError(err) {
        console.error(err);
    }
    
    return (
        <>

            {!scanned && (<QrReader
                onScan={handleScan}
                onError={handleError}
            />)}
            {StudentData && (
                <div className="flex flex-col items-center justify-center">
                    <button
                        onClick={() => { setStudentData(null); setScanned(false); }}
                        className="mt-2 content-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        {StudentData.name} has been registered!
                        <br/>
                        {StudentData.id}
                    </button>
                </div>
            )}
        </>
    );
};
