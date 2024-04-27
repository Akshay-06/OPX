import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllPatientsDetails, getMedicalDetails } from '../redux/actions/auth';
import '../css/InvoiceApp.css';
import { createMedicalRecord } from '../redux/actions/auth';
import Notification from './Notification';
import MedicalRecordPopUp from './MedicalRecordPopUp';

const MedicalRecordApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [medicalDetails, setMedicalDetails] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [showAddNotification, setShowAddNotification] = useState(false);
  const userID = JSON.parse(localStorage.getItem('user_info')).result.doctor_id;
  const [showForm, setShowForm] = useState(false);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const [formData, setFormData] = useState({
    recorddate: '',
    diagnosis: '',
    p_id: '',
    doctor_id: userID
});

  useEffect(() => {
    fetchAllPatientData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

  const fetchAllPatientData = async () => {
    const response = await dispatch(getAllPatientsDetails());
    setPatients(response.patientDetails);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
        ...formData,
        p_id: selectedPatient, // Append patient ID
        doctor_id: userID, // Append doctor ID
    };
    try {
        await dispatch(createMedicalRecord(updatedFormData, navigate));
        setShowAddNotification(true);

        setTimeout(() => {
            setShowAddNotification(false);
            setFormData({
                recorddate: '',
                diagnosis: '',
                p_id: '',
                doctor_id: null
            });
            setShowForm(false);
        }, 3000);

    } catch (error) {
        console.error('Error creating medical record:', error);
    }
};

  const filteredPatients = patients.filter((patient) => {
    return patient.fname.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const viewMedicalRecord = async (patientId) => {
    console.log({ p_id: patientId })
    const medicalDetails = await dispatch(getMedicalDetails({ p_id: patientId }, navigate));
    setMedicalDetails(medicalDetails); // Set the invoice details
  };

  const updateMedicalRecord = (p_id) =>{
      setShowForm(true);
      setSelectedPatient(p_id);
  };

  const closeMedicalDetailsPopup = () => {
    setMedicalDetails(null); // Close the popup by setting invoice details to null
  };

  return (
    <div className="fetch-patients-container">
      {showAddNotification && (
                <Notification
                    message="Medical Record Successfully Added!"
                    onClose={() => setShowAddNotification(false)}
                />
            )}
      <h1>Patient Medical Record Details</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by First Name"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <table id="patients">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Check Medical Record</th>
            <th>Update Medical Record</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.p_id}>
              <td>{patient.fname}</td>
              <td>{patient.lname}</td>
              <td>{patient.email}</td>
              <td>
                <button className='invoice-buttons' onClick={() => viewMedicalRecord(patient.p_id)} >View</button>
              </td>
              <td>
                <button className='invoice-buttons' onClick={()=> updateMedicalRecord(patient.p_id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {medicalDetails && (
        <MedicalRecordPopUp medicalDetails={medicalDetails} onClose={closeMedicalDetailsPopup} />
      )}


      {showForm && (
        <div className="prescription-form-popup">
          <button className='closed-button' onClick={() => setShowForm(false)}>X</button>
          <div className="app-register">
            <div className='registerForm'>
              <div className="title">Add Medical History</div>
              <div className="content">
                <form action="#" className="register-form" onSubmit={handleSubmit}>
                  <div className="user-details">
                    <div className="input-box">
                      <span className="details">Record Date</span>
                      <input name='recorddate' value={formData.recorddate} onChange={handleChange} type="date" placeholder="Enter Record Date" required />
                    </div>
                    <div className="input-box">
                      <span className="details">Diagnosis</span>
                      <input type="text" value={formData.diagnosis} name="diagnosis" onChange={handleChange} placeholder="Enter Diagnosis details" required />
                    </div>

                  </div>

                  <div className="button">
                    <input type="submit" value="Add" />
                  </div>
                </form>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
              </div>
            </div>
          </div>
        </div>


      )}
    </div>
  );
};

export default MedicalRecordApp;
