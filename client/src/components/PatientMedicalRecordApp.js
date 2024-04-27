import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
import { getMedicalDetails, createMedicalRecord } from '../redux/actions/auth';
import "../css/PatientMedicalRecordApp.css"

const PatientMedicalRecordApp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userID = JSON.parse(localStorage.getItem('user_info')).result.p_id;
    const errorMessage = useSelector((state) => state.auth.errorMessage);
    const [medicalDetails, setMedicalDetails] = useState(null);

    const [showAddNotification, setShowAddNotification] = useState(false);
    const [showForm, setShowForm] = useState(false); // State to control the visibility of the form
    const [formData, setFormData] = useState({
        recorddate: '',
        diagnosis: '',
        p_id: '',
        doctor_id: null
    });

    useEffect(() => {
        fetchMedicalRecordData();
    }, [dispatch, userID]);

    const fetchMedicalRecordData = async () => {
        try {
            const medicalDetails = await dispatch(getMedicalDetails({ p_id: userID }, navigate));
            setMedicalDetails(medicalDetails.medicalRecords);
        } catch (error) {
            console.error('Error fetching medical records:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            p_id: userID, // Append patient ID
            doctor_id: null, // Append doctor ID
        };
        try {
            await dispatch(createMedicalRecord(updatedFormData, navigate));
            setShowAddNotification(true);

            setTimeout(() => {
                setShowAddNotification(false);
                setFormData({
                    recorddate: '',
                    diagnosis: '',
                    p_id: '',
                    doctor_id: null
                });
                setShowForm(false);
            }, 3000);


            // Fetch medical records again to update the list
            fetchMedicalRecordData();
        } catch (error) {
            console.error('Error creating medical record:', error);
        }
    };

    return (
        <div className="fetch-services-container">
            {showAddNotification && (
                <Notification
                    message="Medical Record Successfully Added!"
                    onClose={() => setShowAddNotification(false)}
                />
            )}
            {medicalDetails && medicalDetails.length === 0 ? (
                <div>
                    <h1>No Medical Records Found</h1>
                    <button className='buttons' onClick={() => setShowForm(true)}>Add Medical History</button>
                </div>
            ) : (
                <div>
                    <button className='buttons' onClick={() => setShowForm(true)}>Add Medical History</button>
                    <table id='services'>
                        <thead>
                            <tr>
                                <th>Record Date</th>
                                <th>Diagnosis</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicalDetails && medicalDetails.map((medical, index) => (
                                <tr key={index}>
                                    <td>{medical.recorddate}</td>
                                    <td>{medical.diagnosis}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showForm && (
                <div className="prescription-form-popup">
                    <button className='closed-button' onClick={() => setShowForm(false)}>X</button>
                    <div className="app-register">
                        <div className='registerForm'>
                            <div className="title">Add Medical Records</div>
                            <div className="content">
                                <form action="#" className="register-form" onSubmit={handleSubmit}>
                                    <div className="user-details">
                                        <div className="input-box">
                                            <span className="details">Record Date</span>
                                            <input name='recorddate' value={formData.recorddate} onChange={handleChange} type="date" placeholder="Enter Record Date" required />
                                        </div>
                                        <div className="input-box">
                                            <span className="details">Diagnosis</span>
                                            <input type="text" value={formData.diagnosis} name="diagnosis" onChange={handleChange} placeholder="Enter Diagnosis details" required />
                                        </div>

                                    </div>

                                    <div className="button">
                                        <input type="submit" value="Add" />
                                    </div>
                                </form>
                                {errorMessage && <div className="error-message">{errorMessage}</div>}
                            </div>
                        </div>
                    </div>
                </div>


            )}
        </div>
    );
};

export default PatientMedicalRecordApp;
