import React from "react";
import navStyle from './navigation.module.scss';
import {Link} from "react-router-dom";

const Navogation: React.FC = () => (
    <div className={navStyle.items}>
        <li><Link className={navStyle.link} to="/">Home</Link></li>
        <li><Link className={navStyle.link} to='/order'>Order</Link></li>
        <li><Link className={navStyle.link} to="/dashboard">dashboard</Link></li>
        <li><Link className={navStyle.link} to="/storage">storage</Link></li>
    </div>
);

export default Navogation;