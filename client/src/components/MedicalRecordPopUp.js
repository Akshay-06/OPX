import React from 'react';
import "../css/InvoiceDetailsPopup.css"

const MedicalRecordPopUp = ({ medicalDetails, onClose }) => {
  const medicalHistory = medicalDetails.medicalRecords;

  console.log(medicalHistory.length)
  return (

    medicalHistory.length === 0 ?
      (<div className="invoice-details-popup">
        <div className='invoice-details-content '>
          <button className='close-button' onClick={onClose}>X</button><br></br><h1>No Medical Records found</h1></div></div>)
      : (<div className="invoice-details-popup">
        <div className='invoice-details-content '>
          <button className='close-button' onClick={onClose}>X</button><br></br><table id='patient'>
            <thead>
              <tr>
                <th>Record Date</th>
                <th>Diagnosis</th>
              </tr>
            </thead>
            <tbody>
              {medicalHistory.map((medical, index) => (
                <tr key={index}>
                  <td>{medical.recorddate}</td>
                  <td>{medical.diagnosis}</td>
                </tr>
              ))}
            </tbody>
          </table></div></div>
      )


  );
};

export default MedicalRecordPopUp;
