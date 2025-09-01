// // src/components/layouts/Footer.jsx
// import React from "react";

// const Footer = () => {
//   return (
//     <footer
//       style={{
//         padding: "10px 20px",
//         background: "#ecf0f1",
//         textAlign: "center",
//         borderTop: "1px solid #ddd",
//       }}
//     >
//       &copy; {new Date().getFullYear()} MyApp. All rights reserved.
//     </footer>
//   );
// };

// export default Footer;






// src/components/layouts/Footer.jsx
import React from "react";

const Footer = () => {
  return (
  <footer
  style={{
    padding: "15px 20px",
    background: "#1CA3DE",
    textAlign: "center",
    borderTop: "1px solid #ddd",
    color: "#ffff",
    fontSize: "0.9rem",
    fontWeight: "bold"
  }}
>
      &copy; {new Date().getFullYear()} Research Management System. All rights reserved.
    </footer>
  );
};

export default Footer;
