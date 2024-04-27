import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getInvoiceDetails } from '../redux/actions/auth';
import InvoiceDetailsPopup from './InvoiceDetailsPopup';
import "../css/PatientMedicalRecordApp.css"

const PatientInvoiceApp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userID = JSON.parse(localStorage.getItem('user_info')).result.p_id;
    const [invoiceDetails, setInvoiceDetails] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [invoiceDetail, setInvoiceDetail] = useState(null);


    useEffect(() => {
        fetchInvoiceData();
    }, [dispatch, userID]);

    const fetchInvoiceData = async () => {
        try {
            const invoiceDetails = await dispatch(getInvoiceDetails({ p_id: userID }, navigate));
            setInvoiceDetails(invoiceDetails.invoices);
        } catch (error) {
            console.error('Error fetching Invoice DEtails:', error);
        }
    };

    const showMoreDetails = (invoice) =>{
        setInvoiceDetail({invoice_details: invoice})
    };

    const closeInvoiceDetailsPopup = () => {
        setInvoiceDetail(null); // Close the popup by setting invoice details to null
      };

    return (
        <div className="fetch-services-container">
            <h1>Invoice Details</h1>
            {invoiceDetails && invoiceDetails.length === 0 ? (
                <div>
                    <h1>No Invoice DEtails Found</h1>
                </div>
            ) : (

                <table id='services'>
                    <thead>
                        <tr>
                            <th>Invoice Number</th>
                            <th>Invoice Date</th>
                            <th>Amount</th>
                            <th>More Information</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceDetails && invoiceDetails.map((invoice, index) => (
                            <tr key={index}>
                                <td>{invoice.invoice_no}</td>
                                <td>{invoice.invoice_date}</td>
                                <td>{invoice.amount}</td>
                                <td>
                                    <button className='invoice-buttons' onClick={()=> showMoreDetails(invoice)}>
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            )}
            {invoiceDetail && (
        <InvoiceDetailsPopup invoiceDetails={invoiceDetail} onClose={closeInvoiceDetailsPopup} />
      )}

        </div>
    );
};

export default PatientInvoiceApp;
