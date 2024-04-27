import React from 'react';
import "../css/InvoiceDetailsPopup.css"

const InvoiceDetailsPopup = ({ invoiceDetails, onClose }) => {
  console.log(invoiceDetails.invoice_details)

  return (
    <div className="invoice-details-popup">
         
      <div className="invoice-details-content">
      <button className='close-button' onClick={onClose}>X</button>
        <h2>Invoice Details</h2>
        <p>Invoice Number: {invoiceDetails.invoice_details.invoice_no}</p>
        <p>Billing Address: {invoiceDetails.invoice_details.billing_address}</p>
        <p>Payment Status: {invoiceDetails.invoice_details.payment_status ? "Paid" : "Not Paid"}</p>
        <p>Total Amount: {invoiceDetails.invoice_details.amount}</p>
        
        <p>Invoice BreakDown: </p><pre>{invoiceDetails.invoice_details.invoice_breakdown}</pre>
        {/* Add more invoice details as needed */}
     
      </div>
    </div>
  );
};

export default InvoiceDetailsPopup;
