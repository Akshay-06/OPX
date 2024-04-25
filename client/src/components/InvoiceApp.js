import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllPatientsDetails, generateInvoice } from '../redux/actions/auth';
import Notification from './Notification';
import InvoiceDetailsPopup from './InvoiceDetailsPopup';
import '../css/InvoiceApp.css';

const InvoiceApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddNotification, setShowAddNotification] = useState(false);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState(null); // State for invoice details
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
    const invoiceDetails = await dispatch(generateInvoice({ p_id: patientId, hstaff_id: userID }, navigate));
    console.log(invoiceDetails.invoice_structure)
    setInvoiceDetails(invoiceDetails); // Set the invoice details
  };

  const closeInvoiceDetailsPopup = () => {
    setInvoiceDetails(null); // Close the popup by setting invoice details to null
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
      {invoiceDetails && (
        <InvoiceDetailsPopup invoiceDetails={invoiceDetails} onClose={closeInvoiceDetailsPopup} />
      )}
    </div>
  );
};

export default InvoiceApp;
