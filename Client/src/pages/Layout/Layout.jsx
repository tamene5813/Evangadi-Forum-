import React from "react";
import NavbarPage from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Classes from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={Classes.mainContainer}>
      <NavbarPage />
      <div className={Classes.content}>{children}</div>
      <div className={Classes.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
