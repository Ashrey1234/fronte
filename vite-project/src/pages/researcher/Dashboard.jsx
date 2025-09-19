

// src/pages/researcher/Dashboard.jsx

// import React from "react";
// import AppLayout from "../../components/layouts/AppLayout";
// import StatsCards from "./StatsCards";
// import TemplatesSection from "./TemplatesSection";
// import "./Dashboard.css";

// const Dashboard = () => {
//   // Sample stats data
//   const statsData = [
//     { title: "Total Applications", value: 12, trend: "+2" },
//     { title: "Approved", value: 8, trend: "+1" },
//     { title: "Pending", value: 3, trend: "0" },
//     { title: "Rejected", value: 1, trend: "-1" }
//   ];

//   return (
//     <AppLayout role="researcher">
//       {/* <div className="dashboard-container">
//         <h2>Researcher Dashboard</h2>
//         <p className="welcome-text">
//           Welcome to your dashboard! Here you can see overview of your applications and payments.
//         </p> */}

//         {/* Stats Cards Section */}
//         <StatsCards stats={statsData} />



      
      
        
//         Templates section
        
//         <TemplatesSection />
//       {/* </div> */}
//     </AppLayout>
//   );
// };

// export default Dashboard;




















// src/pages/researcher/Dashboard.jsx

import React, { useEffect, useState } from "react";
import AppLayout from "../../components/layouts/AppLayout";
import StatsCards from "./StatsCards";
import TemplatesSection from "./TemplatesSection";
import "./Dashboard.css";

const Dashboard = () => {
  const [statsData, setStatsData] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  useEffect(() => {
    // fetch stats kutoka backend yako
    fetch("http://127.0.0.1:8000/api/dashboard-stats/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStatsData({
          total: data.applications_total || 0,
          approved: data.applications_approved || 0,
          pending: data.applications_pending || 0,
          rejected: data.applications_rejected || 0,
        });
      })
      .catch((err) => console.error("Error fetching dashboard stats:", err));
  }, []);

  return (
    <AppLayout role="researcher">
      {/* Stats Cards Section */}
      <StatsCards stats={statsData} />

      {/* Templates Section */}
      <TemplatesSection />
    </AppLayout>
  );
};

export default Dashboard;
