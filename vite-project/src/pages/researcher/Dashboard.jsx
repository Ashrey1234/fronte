

// src/pages/researcher/Dashboard.jsx
import React from "react";
import AppLayout from "../../components/layouts/AppLayout";
import StatsCards from "./StatsCards";
import TemplatesSection from "./TemplatesSection";
import "./Dashboard.css";

const Dashboard = () => {
  // Sample stats data
  const statsData = [
    { title: "Total Applications", value: 12, trend: "+2" },
    { title: "Approved", value: 8, trend: "+1" },
    { title: "Pending", value: 3, trend: "0" },
    { title: "Rejected", value: 1, trend: "-1" }
  ];

  return (
    <AppLayout role="researcher">
      {/* <div className="dashboard-container">
        <h2>Researcher Dashboard</h2>
        <p className="welcome-text">
          Welcome to your dashboard! Here you can see overview of your applications and payments.
        </p> */}

        {/* Stats Cards Section */}
        <StatsCards stats={statsData} />



      
      
        
        Templates section
        
        <TemplatesSection />
      {/* </div> */}
    </AppLayout>
  );
};

export default Dashboard;





