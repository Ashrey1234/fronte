
import React from "react";
import "./Footer.css"; // ✅ import CSS

const Footer = () => {
  return (
    <footer className="footer">
      &copy; {new Date().getFullYear()} Research Management System. All rights reserved.
    </footer>
  );
};

export default Footer;


