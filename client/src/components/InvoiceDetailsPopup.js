import React from 'react';
import "../css/InvoiceDetailsPopup.css"

const InvoiceDetailsPopup = ({ invoiceDetails, onClose }) => {
  console.log(invoiceDetails.invoice_structure)

  return (
    <div className="invoice-details-popup">
      <div className="invoice-details-content">
        <h2>Invoice Details</h2>
        <p>Invoice Number: {invoiceDetails.invoice_details.invoice_no}</p>
        <p>Billing Address: {invoiceDetails.invoice_details.billing_address}</p>
        <p>Payment Status: {invoiceDetails.invoice_details.payment_status ? "Paid" : "Not Paid"}</p>
        <p>Total Amount: {invoiceDetails.invoice_details.amount}</p>
        
        <p>Invoice BreakDown: </p><pre>{invoiceDetails.invoice_structure}</pre>
        {/* Add more invoice details as needed */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default InvoiceDetailsPopup;
