// PrescriptionForm.js

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AUTH_ERROR } from '../redux/const/actionTypes';
import { useDispatch } from 'react-redux';
import { createPrescription } from '../redux/actions/auth';
import Notification from "./Notification";
import "../css/CreatePrescriptionApp.css"

const CreatePrescriptionApp = ( { patient, onClose, doctorId }) => {

    const dispatch = useDispatch();
    const nagivate = useNavigate();
    const errorMessage = useSelector((state) => state.auth.errorMessage);
    const [showNotification, setShowNotification] = useState(false);
    const [formData, setFormData] = useState({
        date_prescribed: '',
        labtests: '',
        medication: '',
        p_id: '',
        doctor_id: ''
    });

    useEffect(() => {
        
    }, [showNotification, onClose, errorMessage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            p_id: patient.p_id, // Append patient ID
            doctor_id: doctorId, // Append doctor ID
        };


        dispatch(createPrescription(updatedFormData, nagivate))
        .then(() => {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                setFormData({
                    date_prescribed: '',
                    labtests: '',
                    medication: '',
                    p_id: '',
                    doctor_id: ''});
                    onClose();
            }, 3000);
        })
        .catch((err) => {
            console.log(err.response.data.errors[0].message);
            dispatch({ type: AUTH_ERROR, errorMessage: err.response.data.errors[0].message })
        });
        // onSubmit(formData);
    };

    return (
        <div className="prescription-form-popup">
            {showNotification && (
                <Notification
                    message="Prescription Created Successfully!"
                    onClose={() => setShowNotification(false)}
                />
            )}
            <button className='close-button' onClick={onClose}>X</button>
            <div className="app-register">
                <div className='registerForm'>
                    <div className="title">Create Prescription</div>
                    <div className="content">
                        <form action="#" className="register-form" onSubmit={handleSubmit}>
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">Date Prescribed</span>
                                    <input name='date_prescribed' value={formData.date_prescribed} onChange={handleChange} type="date" placeholder="Enter Date Prescribed" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Lab Tests</span>
                                    <input type="text" value={formData.labtests} name="labtests" onChange={handleChange} placeholder="Enter Lab Test" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Medication</span>
                                    <input type="text" name="medication" value={formData.medication} onChange={handleChange} placeholder="Enter Medication" required />
                                </div>
                            </div>

                            <div className="button">
                                <input type="submit" value="Create" />
                            </div>
                        </form>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePrescriptionApp;
