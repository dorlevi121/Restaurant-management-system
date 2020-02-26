import React, {Component} from 'react';
import homeStyles from "./home.module.scss";
import logo from "../../../assets/logo/logo.png";

import {Link} from "react-router-dom";
import Routing from "../../../app.routing";


class Home extends Component {


    render() {
        return (
            <div className={homeStyles.App}>
                <ul className={homeStyles.ul}>
                    <div className={homeStyles.Header}>
                        <img src={logo} alt="Logo"/>
                    </div>
                    <div className={homeStyles.items}>
                        <li><Link className={homeStyles.link} to="/">Home</Link></li>
                        <li><Link className={homeStyles.link} to='/order'>Order</Link></li>
                        <li><Link className={homeStyles.link} to="/dashboard">dashboard</Link></li>
                        <li><Link className={homeStyles.link} to="/storage">storage</Link></li>
                    </div>
                </ul>
                <Routing/>
            </div>
        );
    }
}


export default Home;