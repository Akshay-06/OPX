import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/LoginApp.css'
import { useDispatch, connect } from 'react-redux';

const LoginApp = (props) => {
    const [userType, setUserType] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleSubmit(e) {
        e.preventDefault();

        console.log({userType,email,password});
        if (email !== "" && password !== "") {
            if(userType == "Patient"){
                
                console.log("Patient")
            }
            if(userType == "Doctor"){
                console.log("Doctor")
            }
            if(userType == "Hospital Staff"){
                console.log("Hospital Staff")
            }

        //   dispatch(signin({ email, password }, navigate))
        }
      }
    return (
        <div className='app-login'>
            <div className="login-container">
                <form action="#" className='login-form'>
                    <h1>Welcome back</h1>
                        <select onChange={e => setUserType(e.target.value)}>
                            <option>--Select User Type--</option>
                            <option>Patient</option>
                            <option>Doctor</option>
                            <option>Hospital Staff</option>
                        </select>
                    <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" required/>
                    <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required/>
                    <div className='forgotContainer'>
                        <div>
                            <Link to="/hokieforu/forgot-password">Forgot Password</Link>
                        </div>
                    </div>
                    <div className='sigin'>
                        <button className='signin-button' onClick={handleSubmit}>Sign In</button>
                    </div>
                    {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}
                    
                </form>
            </div>

        </div>
    )
}


export default (LoginApp);