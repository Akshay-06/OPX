import React, { useEffect, useState } from 'react';
import { getAllPatientsDetails } from '../redux/actions/auth';
import '../css/PrescriptionApp.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import CreatePrescriptionApp from './CreatePrescriptionApp';

const PrescriptionApp = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [patients, setPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
    const userID = JSON.parse(localStorage.getItem("user_info")).result.doctor_id;

    useEffect(() => {
        fetchAllPatientData();
    }, []);

    const fetchAllPatientData = async () => {
        const response = await dispatch(getAllPatientsDetails());
        setPatients(response.patientDetails);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredPatients = patients.filter((patient) => {
        return patient.fname.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleCreatePrescription = (patient) => {
        setSelectedPatient(patient);
        setShowPrescriptionForm(prevState => !prevState);
    };
    

    const handleClosePrescriptionForm = () => {
        setShowPrescriptionForm(false);
    };

    return (
        <div className="fetch-patient-container">
            <h1>Patient Details</h1>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search by First Name"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <table id="patient">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPatients.map((patient) => (
                        <tr key={patient.p_id}>
                            <td>{patient.fname}</td>
                            <td>{patient.lname}</td>
                            <td>{patient.email}</td>
                            <td>
                                <button className='prescription-buttons' onClick={() => handleCreatePrescription(patient)}>Create Prescription</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showPrescriptionForm && selectedPatient && (
                <CreatePrescriptionApp
                    patient={selectedPatient}
                    onClose={handleClosePrescriptionForm}
                    doctorId={userID}
                />
            )}
        </div>
    );
};

export default PrescriptionApp;
