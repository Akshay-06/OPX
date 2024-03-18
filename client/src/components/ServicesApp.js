import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllServicesDetails, addServiceDetails, updateServiceDetails, deleteServiceDetails } from '../redux/actions/auth';
import Notification from './Notification';
import '../css/ServicesApp.css';

const ServicesApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [showAddNotification, setShowAddNotification] = useState(false);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const [editServiceId, setEditServiceId] = useState(null);
  const [editedServiceFee, setEditedServiceFee] = useState(null);
  const [isConfirmationShown, setIsConfirmationShown] = useState(false);
  const userID = JSON.parse(localStorage.getItem('user_info')).result.hstaff_id;

  const serviceDetails = useSelector(state => state.serviceDetails);

  useEffect(() => {
    fetchServicesData();
  }, []);

  useEffect(() => {
    setServices(serviceDetails);
  }, [serviceDetails]);

  const fetchServicesData = async () => {
    const response = await dispatch(getAllServicesDetails());
    setServices(response.serviceDetails);
  };

  const handleEditServiceFee = (serviceId, currentServiceFee) => {
    if (editServiceId === serviceId) return;
    setEditServiceId(serviceId);
    setEditedServiceFee(currentServiceFee);
    setIsConfirmationShown(false); // Reset the flag
  };

  const handleSaveServiceFee = async (serviceId) => {
    if (!isConfirmationShown && editedServiceFee !== null && editedServiceFee !== services.find(service => service.service_id === serviceId).service_fee) {
      const confirmed = window.confirm("Are you sure you want to save the changes?");
      setIsConfirmationShown(true); // Set the flag to true after showing confirm dialog
      if (confirmed) {
        await dispatch(updateServiceDetails({ service_id: serviceId, service_fee: editedServiceFee, hstaff_id: userID }, navigate));
        setShowUpdateNotification(true);
        setTimeout(() => {
          setShowUpdateNotification(false);
        }, 3000);
        fetchServicesData();
      }
    }
    setEditServiceId(null);
    setEditedServiceFee(null);
  };

  const handleCancelEdit = () => {
    setEditServiceId(null);
    setEditedServiceFee(null);
    setIsConfirmationShown(false); // Reset the flag
  };

  const handleAddService = async () => {
    const serviceName = prompt('Please enter the service name you want to add');
    const serviceFee = prompt('Please enter the cost of your service provided');
    if (serviceFee && serviceName) {
      await dispatch(addServiceDetails({ service_name: serviceName, service_fee: serviceFee, hstaff_id: userID }, navigate));
      setShowAddNotification(true);
      setTimeout(() => {
        setShowAddNotification(false);
      }, 3000);
      fetchServicesData(); // Fetch updated services after adding
    }
  };

  const handleDeleteService = async (serviceId) => {
    const confirmed = window.confirm('Are you sure you want to delete this service?');
    if (confirmed) {
      await dispatch(deleteServiceDetails({ service_id: serviceId }, navigate));
      setShowDeleteNotification(true);
      setTimeout(() => {
        setShowDeleteNotification(false);
      }, 3000);
      fetchServicesData(); // Fetch updated services after deleting
    }
  };

  return (
    <div className="fetch-services-container">
      {showUpdateNotification && (
        <Notification
          message="Service Fee Updated Successfully!"
          onClose={() => setShowUpdateNotification(false)}
        />
      )}
      {showAddNotification && (
        <Notification
          message="Service Fee Added Successfully!"
          onClose={() => setShowAddNotification(false)}
        />
      )}
      {showDeleteNotification && (
        <Notification
          message="Service Deleted Successfully!"
          onClose={() => setShowDeleteNotification(false)}
        />
      )}

      <h1>Services</h1>
      <button className="buttons" onClick={handleAddService}>Add Service</button>
      <table id="customers">
        <thead>
          <tr>
            <th>Service ID</th>
            <th>Service Name</th>
            <th>Service Fee</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {services && services.map((service) => (
            <tr key={service.service_id}>
              <td>{service.service_id}</td>
              <td>{service.service_name}</td>
              <td>
                {editServiceId === service.service_id ? (
                  <input
                    type="text"
                    value={editedServiceFee}
                    onChange={(e) => setEditedServiceFee(e.target.value)}
                    onBlur={() => handleSaveServiceFee(service.service_id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveServiceFee(service.service_id);
                      } else if (e.key === 'Escape') {
                        handleCancelEdit();
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  service.service_fee
                )}
              </td>
              <td>
                <i className="fa fa-edit" onClick={() => handleEditServiceFee(service.service_id, service.service_fee)}></i>
              </td>
              <td>
                <i className="fa fa-trash-alt" onClick={() => handleDeleteService(service.service_id)}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesApp;
