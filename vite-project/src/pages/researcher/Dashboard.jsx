// // src/pages/researcher/Dashboard.jsx



// import React from "react";
// import AppLayout from "../../components/layouts/AppLayout";



// const Dashboard = () => {
//   return (
//     <AppLayout role="researcher">
//       <h2>Researcher Dashboard</h2>
//       <p>Welcome to your dashboard! Here you can see overview of your applications and payments.              </p>
//     </AppLayout>
//   );
// };

// export default Dashboard;











import React from "react";
import AppLayout from "../../components/layouts/AppLayout";
import TemplatesSection from "./TemplatesSection";
import "./Dashboard.css"; // kama una style za dashboard

const Dashboard = () => {
  return (
    <AppLayout role="researcher">
      <h2>Researcher Dashboard</h2>
      <p>
        Welcome to your dashboard! Here you can see overview of your applications and payments.
      </p>

      {/* Templates section */}
      <TemplatesSection />
    </AppLayout>
  );
};

export default Dashboard;






