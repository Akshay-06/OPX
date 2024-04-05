import React from "react";
import { Link } from "react-router-dom";
import '../css/AccountApp.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AccountApp = () => {
    const dispatch = useDispatch();
    const nagivate = useNavigate();



    return (
        <div className='app-account'>
            <div className="register-buttons">
            <div className="search-jobs">
                <Link to="/opx/account/patient-register">REGISTER A PATIENT</Link>
            </div>
            <div className="search-jobs">
                <Link to="/opx/account/doctor-register">REGISTER A DOCTOR</Link>
            </div>
            
            </div>
            <div className="register-buttons">
            <div className="search-jobs">
                <Link to="/opx/account/services">SERVICES</Link>
            </div>
            <div className="search-jobs">
                <Link to="/opx/account/invoice">GENERATE INVOICE</Link>
            </div>
            </div>
            <div className="jobs-container">

               
            </div>


        </div>
    )
}

export default (AccountApp);
