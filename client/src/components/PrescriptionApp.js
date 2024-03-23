import React, { useState } from "react";
import '../css/PatientRegisterApp.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, connect } from 'react-redux';
import { createPrescription } from "../redux/actions/auth";
import Notification from "./Notification";



const InitState = {
    date_prescribed: "",
    labtests: "",
    medication: '',
    p_id: ''
}

const PrescriptionApp = (props) => {

    const nagivate = useNavigate();
    const dispatch = useDispatch();
    const [sForm,
        setsForm] = useState(InitState)
    const [showNotification, setShowNotification] = useState(false);
    const userID = JSON.parse(localStorage.getItem("user_info")).result.doctor_id;

    const handleChange = (e) => setsForm({
        ...sForm,
        [e.target.name]: e.target.value
    });

    function handleOnSubmit(e) {
        e.preventDefault();
        if (sForm.date_prescribed !== "" && sForm.labtests !== "" && sForm.medication !== "" && sForm.p_id !== "" ) {
             sForm.doctor_id = userID
            dispatch(createPrescription(sForm, nagivate))
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                setsForm(InitState);
            }, 3000);
        }
    }

    return (
        <div className='register'>
            {showNotification && (
                <Notification
                    message="Prescription Created Successful!"
                    onClose={() => setShowNotification(false)}
                />
            )}
            <div className="app-register">
                <div className='registerForm'>
                    <div className="title">Create Prescription</div>
                    <div className="content">
                        <form action="#" className="register-form" onSubmit={handleOnSubmit}>
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">Date Prescribed</span>
                                    <input name='date_prescribed' value={sForm.date_prescribed} onChange={handleChange} type="date" placeholder="Enter Date Prescribed" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Lab Tests</span>
                                    <input type="text" value={sForm.labtests} name="labtests" onChange={handleChange} placeholder="Enter Lab Test" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Medication</span>
                                    <input type="text" name="medication" value={sForm.medication} onChange={handleChange} placeholder="Enter Medication" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Patient ID</span>
                                    <input type='number' name='p_id' pattern="[0-9]{10}" value={sForm.p_id} onChange={handleChange} placeholder="Enter Patient's number" required />
                                </div>
                                
                            </div>

                            <div className="button">
                                <input type="submit" value="Create" />
                            </div>
                            {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}


                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default (PrescriptionApp);
