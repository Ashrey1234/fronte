// src/components/layouts/sidebars/OfficerSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaFileAlt, FaUser } from "react-icons/fa";
import "../Sidebars.css";

const OfficerSidebar = ({ isOpen, toggleSidebar }) => {
  const links = [
    { name: "Dashboard", path: "/officer-dashboard", icon: <FaTachometerAlt /> },
    { name: "Review Applications", path: "/review-applications", icon: <FaFileAlt /> },
    { name: "Profile", path: "/officer-profile", icon: <FaUser /> },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo-container">
        <img src="images.png" alt="Logo" />
        {/* <h2>Officer Panel</h2> */}
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

export default OfficerSidebar;
