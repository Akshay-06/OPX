import { Routes, Route, Navigate } from "react-router-dom";
import HomeApp from './components/HomeApp';
import HeaderApp from './components/HeaderApp';
import LoginApp from "./components/LoginApp";
import AccountApp from "./components/AccountApp";
import PatientRegisterApp from "./components/PatientRegisterApp";
import './css/App.css';

function App() {
  return (
    <div className="App">
    <HeaderApp  />
    <Routes>
      <Route path="/opx" Component={HomeApp} />
      <Route path="/" element={<Navigate to="/opx" replace />} />
      <Route path='/opx/login' Component={LoginApp} />
      <Route path='/opx/account/home' Component={AccountApp} />
      <Route path="/opx/account/patient-register" Component={PatientRegisterApp} />
      {/* <Route path="/opx/forgot-password" Component={ForgotPasswordApp}></Route>
      <Route path="/opx/reset-password/:id/:token" Component={ResetPasswordApp}></Route>
      <Route path="/opx/account/post-a-job" Component={PostJobApp} />
      <Route path="/opx/account/myprofile" Component={ProfileApp} />
      <Route path="/opx/account/myjobs" Component={FetchJobApp} />  */}
      {/* <Route path="*" Component={NotFoundPage} /> */}
    </Routes>
  </div>
  );
}

export default App;
