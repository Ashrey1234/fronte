// src/components/layouts/sidebars/AdminSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaFileAlt, FaUser } from "react-icons/fa";
import "../Sidebars.css";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "User Management", path: "/users", icon: <FaUser /> },
    { name: "Applications Management", path: "/applications", icon: <FaFileAlt /> },
    { name: "Reports", path: "/reports", icon: <FaFileAlt /> },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo-container">
        <img src="images.png" alt="Logo" />
        {/* <h2>Admin Panel</h2> */}
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

export default AdminSidebar;
