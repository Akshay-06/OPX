import React, { useState } from 'react';
import '../css/Notification.css'; 

const Notification = ({ message, onClose }) => {
  return (
    <div className="notification">
      <p>{message}</p>
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default Notification;
