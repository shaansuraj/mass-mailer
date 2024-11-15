import React from 'react';
import { auth } from '../firebase';
import MassMailForm from './MassMailForm';
import './Dashboard.css';

const Dashboard = () => {
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="dashboard-container">
      <h2>Mass Mailer Dashboard</h2>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <MassMailForm />
    </div>
  );
};

export default Dashboard;
