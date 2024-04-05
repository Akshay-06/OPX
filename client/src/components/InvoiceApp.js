import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllPatientsDetails, generateInvoice } from '../redux/actions/auth';
import Notification from './Notification';
import '../css/InvoiceApp.css';

const InvoiceApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddNotification, setShowAddNotification] = useState(false);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const userID = JSON.parse(localStorage.getItem('user_info')).result.hstaff_id;

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



  const handleGenerateInvoice = async (patientId) => {
     const invoice_details =  await dispatch(generateInvoice({ p_id: patientId }, navigate));
      
    console.log(invoice_details)
  };

  return (
    <div className="fetch-patients-container">
      <h1>Patient Details</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by First Name"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <table id="customers">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Invoice</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.p_id}>
              <td>{patient.fname}</td>
              <td>{patient.lname}</td>
              <td>{patient.email}</td>
              <td>
                <button className='invoice-buttons' onClick={() => handleGenerateInvoice(patient.p_id)}>Generate Invoice</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceApp;
