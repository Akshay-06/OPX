import React from "react";
import { Link } from "react-router-dom";
import '../css/AccountApp.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const DoctorAccountApp = () => {
    const dispatch = useDispatch();
    const nagivate = useNavigate();



    return (
        <div className='app-account'>
            <div className="register-buttons">
            <div className="search-jobs">
                <Link to="/opx/account/prescription-create">CREATE PRESCRIPTION</Link>
            </div>
            
</div>
        </div>
    )
}

export default (DoctorAccountApp);
