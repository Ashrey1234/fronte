// src/components/layouts/sidebars/ResearcherSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaFileAlt, FaBell, FaUser, FaCreditCard } from "react-icons/fa";
import "../Sidebars.css";

const ResearcherSidebar = ({ isOpen, toggleSidebar }) => {
  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Payments", path: "/payments", icon: <FaCreditCard /> },
    { name: "Submit Application", path: "/submit-application", icon: <FaFileAlt /> },
    { name: "Notifications", path: "/notifications", icon: <FaBell /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo-container">
        <img src="images.png" alt="Logo" />
        {/* <h2>Researcher Panel</h2> */}
      </div>

      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.name}>
              <Link to={link.path} onClick={toggleSidebar}>
                <span>{link.icon}</span>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default ResearcherSidebar;
