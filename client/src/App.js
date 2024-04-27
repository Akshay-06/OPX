import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AUTH_ERROR, LOGOUT } from "../src/redux/const/actionTypes";
import HomeApp from './components/HomeApp';
import HeaderApp from './components/HeaderApp';
import LoginApp from "./components/LoginApp";
import AccountApp from "./components/AccountApp";
import PatientRegisterApp from "./components/PatientRegisterApp";
import DoctorRegisterApp from "./components/DoctorRegisterApp";
import ServicesApp from "./components/ServicesApp";
import PrescriptionApp from "./components/PrescriptionApp";
import InvoiceApp from "./components/InvoiceApp";

import './css/App.css';
import MedicalRecordApp from "./components/MedicalRecordApp";
import PatientMedicalRecordApp from "./components/PatientMedicalRecordApp";
import PatientInvoiceApp from "./components/PatientInvoiceApp";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('user_info') !== null;
    setAuthenticated(isAuthenticated);
    dispatch({ type: AUTH_ERROR, errorMessage: null });
  });

  const handleLogOut = (e) => {
    // Clear the authentication token from local storage
    e.preventDefault()
    navigate("/opx/login");
    dispatch({ type: LOGOUT })

    // Update the state to indicate logged out
    setAuthenticated(false);
  };

  return (
    <div className="App">
    <HeaderApp authenticated={authenticated} handleLogOut={handleLogOut}/>
    <Routes>
      <Route path="/opx" Component={HomeApp} />
      <Route path="/" element={<Navigate to="/opx" replace />} />
      <Route path='/opx/login' Component={LoginApp} />
      <Route path='/opx/account/home' Component={AccountApp} />
      <Route path="/opx/account/patient-register" Component={PatientRegisterApp} />
      <Route path="/opx/account/doctor-register" Component={DoctorRegisterApp} />
      <Route path="/opx/account/prescription-create" Component={PrescriptionApp}/>
      <Route path="/opx/account/services" Component={ServicesApp} />
      <Route path="/opx/account/invoice" Component={InvoiceApp} />
      <Route path="/opx/account/write-prescription" Component={PrescriptionApp}/>
      <Route path="/opx/account/doctor/medical-record" Component={MedicalRecordApp}/>
      <Route path="/opx/account/patient/medical-record" Component={PatientMedicalRecordApp}/>
      <Route path="/opx/account/patient/invoice-details" Component={PatientInvoiceApp}/>
      {/*<Route path="/opx/reset-password/:id/:token" Component={ResetPasswordApp}></Route>
      <Route path="/opx/account/myprofile" Component={ProfileApp} />
      <Route path="/opx/account/myjobs" Component={FetchJobApp} />  
     <Route path="*" Component={NotFoundPage} /> */}
    </Routes>
  </div>
  );
}

export default App;
