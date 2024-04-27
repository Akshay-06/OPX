import React, { useState } from "react";
import '../css/PatientRegisterApp.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, connect } from 'react-redux';
import { signup } from "../redux/actions/auth";
import Notification from "./Notification";



const InitState = {
    fname: "",
    lname: "",
    email: '',
    contact_no: '',
    password: '',
    confirmPassword: '',
    age: '',
    address: ''
}

const PatientRegisterApp = (props) => {

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
        if (sForm.fname !== "" && sForm.lname !== "" && sForm.contact_no !== "" && sForm.password !== "" && sForm.confirmPassword !== "" && sForm.email !== "" && sForm.password === sForm.confirmPassword && sForm.password.length >= 4 && sForm.address !== "" && sForm.age !== "") {
             sForm.hstaff_id = userID
            dispatch(signup(sForm, nagivate))
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                setsForm(InitState);
            }, 3000);
        }
    }

    return (
        <div className='patient-register'>
            {showNotification && (
                <Notification
                    message="Patient Registration Successful!"
                    onClose={() => setShowNotification(false)}
                />
            )}
            <div className="app-patient-register">
                <div className='patient-registerForm'>
                    <div className="title">Patient Registration</div>
                    <div className="content">
                        <form action="#" className="register-form" onSubmit={handleOnSubmit}>
                            <div className="user-patient-details">
                                <div className="input-box">
                                    <span className="patient-details">First Name</span>
                                    <input name='fname' value={sForm.fname} onChange={handleChange} type="text" placeholder="Enter Patient's first name" required />
                                </div>
                                <div className="input-box">
                                    <span className="patient-details">Last name</span>
                                    <input type="text" value={sForm.lname} name="lname" onChange={handleChange} placeholder="Enter Patient's last name" required />
                                </div>
                                <div className="input-box">
                                    <span className="patient-details">Email</span>
                                    <input type="email" name="email" value={sForm.email} onChange={handleChange} placeholder="Enter Patient's email" required />
                                </div>
                                <div className="input-box">
                                    <span className="patient-details">Contact Number</span>
                                    <input type='tel' name='contact_no' pattern="[0-9]{10}" value={sForm.contact_no} onChange={handleChange} placeholder="Enter Patient's number" required />
                                </div>
                                <div className="input-box">
                                    <span className="patient-details">Password</span>
                                    <input type="password" name="password" value={sForm.password} onChange={handleChange} placeholder="Enter password" required />
                                </div>
                                <div className="input-box">
                                    <span className="patient-details">Confirm Password</span>
                                    <input type="password" name="confirmPassword" onChange={handleChange} value={sForm.confirmPassword} placeholder="Confirm password" required />
                                </div>
                                <div className="input-box">
                                    <span className="patient-details">Age</span>
                                    <input type="number" name="age" onChange={handleChange} value={sForm.age}  placeholder="Enter Patient's age" maxLength="3" required />
                                </div>
                                <div className="input-box">
                                    <span className="patient-details">Address</span>
                                    <input type="text" name="address" onChange={handleChange} value={sForm.address}  placeholder="Enter Patient's Address" required />
                                </div>
                            </div>

                            <div className="patient-button">
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


export default (PatientRegisterApp);
