

import React, { useState, useRef, useEffect } from "react";
import "./Header.css";

const Header = ({ role, toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const username = localStorage.getItem("username") || "User";

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    let initials = "";
    for (let i = 0; i < Math.min(names.length, 3); i++) {
      if (names[i].length > 0) initials += names[i][0].toUpperCase();
    }
    return initials;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        await fetch("http://127.0.0.1:8000/api/logout/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh }),
        });
      }
    } catch {}
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    window.location.href = "/login";
    setDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      <div className="header-right">
        <span className="welcome-text">Welcome, {username}</span>

        <div className="avatar" onClick={toggleDropdown} ref={dropdownRef}>
          {getInitials(username)}

          {dropdownOpen && (
            <div className="dropdown">
              <div className="user-info">{username}</div>
              <div className="logout" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
