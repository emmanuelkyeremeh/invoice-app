import React from "react";
import "../styles/nav.css";
import logo from "../assets/logo.svg";
import moonIcon from "../assets/icon-moon.svg";
import avatar from "../assets/image-avatar.jpg";
const Navbar = () => {
  return (
    <nav>
      <div className="navbar-logo">
        <img src={logo} alt="" />
      </div>
      <div className="navbar-content">
        <img className="moon-icon" src={moonIcon} alt="" />
        <hr className="horizontal-line" />
        <img className="avatar" src={avatar} alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
