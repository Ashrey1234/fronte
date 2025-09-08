









import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import "./AppLayout.css";

const AppLayout = ({ children, role = "researcher", user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app-layout">
      {/* Sidebar overlay for mobile */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} 
        onClick={toggleSidebar}
      />
      
      {/* Sidebar */}
      <Sidebar role={role} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="main-content">
        <Header 
          role={role} 
          toggleSidebar={toggleSidebar} 
          user={user} 
          onLogout={onLogout} 
        />

        <main className="page-content">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
