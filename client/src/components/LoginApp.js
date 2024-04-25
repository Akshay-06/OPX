import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/LoginApp.css'
import { connect, useDispatch } from 'react-redux';
import { signin } from "../redux/actions/auth";

const LoginApp = (props) => {
    const [userType, setUserType] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function handleSubmit(e) {
        e.preventDefault();
        if (email !== "" && password !== "") {
            let signInData;
            if (userType === "Doctor") {
                signInData = { doctor_id: email, password };
            } else {
                signInData = { email, password };
            }
            
            try {
                const response = await dispatch(signin(signInData, "/" + userType.toLowerCase(), navigate));
               if(response.status === 200)
               localStorage.setItem('userType', userType)
                // Handle the response here
            } catch (error) {
                console.error("Error:", error);
                // Handle any errors
            }
        } else {
            // Handle form validation errors
        }
    }
    
    return (
        <div className='app-login'>
            <div className="login-container">
                <form action="#" className='login-form' onSubmit={handleSubmit}>
                    <h1>Welcome back</h1>
                        <select onChange={e => setUserType(e.target.value)}>
                            <option>--Select User Type--</option>
                            <option>Patient</option>
                            <option>Doctor</option>
                            <option value="staff">Hospital Staff</option>
                        </select>
                    <input type="text" onChange={e => setEmail(e.target.value)} placeholder="Username" required/>
                    <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required/>
                    <div className='forgotContainer'>
                        <div>
                            <Link to="/hokieforu/forgot-password">Forgot Password</Link>
                        </div>
                    </div>
                    <div className='sigin'>
                        <button type="submit" className='signin-button' >Sign In</button>
                    </div>
                    {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}
                    
                </form>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      errorMessage: state.auth.errorMessage,
    };
  };

export default connect(mapStateToProps)(LoginApp);