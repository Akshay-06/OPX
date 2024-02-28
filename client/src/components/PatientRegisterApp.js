import React, { useState } from "react";
import '../css/PatientRegisterApp.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, connect } from 'react-redux';




const PatientRegisterApp = (props) => {
    

    return (
        <div className='register'>
            
            <div className="app-register">
                
                <div className='registerForm'>
                    <div className="title">Patient Registration</div>
                    <div className="content">
                        <form action="#" className="register-form" >
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">First Name</span>
                                    <input  name='firstName' type="text" placeholder="Enter your first name" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Last name</span>
                                    <input type="text" name="lastName"  placeholder="Enter your last name" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input type="email" name="email"  placeholder="Enter your email" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Contact Number</span>
                                    <input type='tel' name='phoneNumber' pattern="[0-9]{10}" placeholder="Enter your number" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Password</span>
                                    <input type="password" name="password" placeholder="Enter your password" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Confirm Password</span>
                                    <input type="password" name="confirmPassword" placeholder="Confirm your password" required />
                                </div>
                            </div>
                            
                            <div class="button">
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
