import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <h1>Lambda Eats</h1>
      <nav>
        <div>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/help">Help</NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Header;
