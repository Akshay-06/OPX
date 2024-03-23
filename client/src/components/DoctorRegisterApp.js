import React, { useState } from "react";
import '../css/DoctorRegisterApp.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, connect } from 'react-redux';
import { signupDoctor } from "../redux/actions/auth";
import Notification from "./Notification";



const InitState = {
    fname: "",
    lname: "",
    contact_no: '',
    specialization: ''
}

const DoctorRegisterApp = (props) => {

    const nagivate = useNavigate();
    const dispatch = useDispatch();
    const [sForm,
        setsForm] = useState(InitState)
    const [showNotification, setShowNotification] = useState(false);
    const userID = JSON.parse(localStorage.getItem("user_info")).result.hstaff_id;

    const handleChange = (e) => setsForm({
        ...sForm,
        [e.target.name]: e.target.value
    });

    function handleOnSubmit(e) {
        e.preventDefault();
        if (sForm.fname !== "" && sForm.lname !== "" && sForm.contact_no !== "" && sForm.specialization !== "") {
             sForm.hstaff_id = userID
            dispatch(signupDoctor(sForm, nagivate))
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
                    message="Doctor Registration Successful!"
                    onClose={() => setShowNotification(false)}
                />
            )}
            <div className="app-register">
                <div className='registerForm'>
                    <div className="title">Doctor Registration</div>
                    <div className="content">
                        <form action="#" className="register-form" onSubmit={handleOnSubmit}>
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">First Name</span>
                                    <input name='fname' value={sForm.fname} onChange={handleChange} type="text" placeholder="Enter Doctor's first name" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Last name</span>
                                    <input type="text" value={sForm.lname} name="lname" onChange={handleChange} placeholder="Enter Doctor's last name" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Contact Number</span>
                                    <input type='tel' name='contact_no' pattern="[0-9]{10}" value={sForm.contact_no} onChange={handleChange} placeholder="Enter Doctor's number" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Specialization</span>
                                    <input type="text" name="specialization" onChange={handleChange} value={sForm.specialization}  placeholder="Enter Doctor's Specialization" required />
                                </div>
                            </div>

                            <div className="button">
                                <input type="submit" value="Register" />
                            </div>
                            {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}


                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default (DoctorRegisterApp);
