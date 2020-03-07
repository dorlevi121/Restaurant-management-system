import React from "react";
import navStyle from "./navigation.module.scss";
import { Link } from "react-router-dom";
import { FaPizzaSlice } from "react-icons/fa";

const Navigation: React.FC = () => (
  <div className={navStyle.Navbar}>
    <div className={navStyle.LogoBox}>
      <Link to="/" className={navStyle.Logo}>
        Compie Restaurant
        <i className={navStyle.Fas}>
          <FaPizzaSlice />
        </i>
      </Link>
    </div>

    <div className={navStyle.NavLinks}>
      <li>
        <Link className={navStyle.NavLink} to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className={navStyle.NavLink} to="/order">
          Order
        </Link>
      </li>
      <li>
        <Link className={navStyle.NavLink} to="/dashboard">
          dashboard
        </Link>
      </li>
      <li>
        <Link className={navStyle.NavLink} to="/storage">
          storage
        </Link>
      </li>
    </div>
  </div>
);

export default Navigation;
