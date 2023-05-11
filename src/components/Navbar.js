import React from "react";
import "../styles/nav.css";
import logo from "../assets/logo.svg";
import moonIcon from "../assets/icon-moon.svg";
import avatar from "../assets/image-avatar.jpg";
import { useRecoilState } from "recoil";
import { darkMode } from "../state/state";
import sunIcon from "../assets/icon-sun.svg";
const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkMode);
  return (
    <nav>
      <div className="navbar-logo">
        <img src={logo} alt="" />
      </div>
      <div className="navbar-content">
        {isDarkMode ? (
          <img
            className="moon-icon"
            src={sunIcon}
            alt=""
            onClick={() => setIsDarkMode(!isDarkMode)}
          />
        ) : (
          <img
            className="moon-icon"
            src={moonIcon}
            alt=""
            onClick={() => setIsDarkMode(!isDarkMode)}
          />
        )}

        <hr className="horizontal-line" />
        <img className="avatar" src={avatar} alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
