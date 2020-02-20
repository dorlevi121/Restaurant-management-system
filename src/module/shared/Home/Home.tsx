import React, {Component} from 'react';
import homeStyles from "./Home.module.scss";
import logo from "../../../assets/logo/logo.png";
import {Link} from "react-router-dom";
import {OrderState} from "../../../store/Order/order.types";
import Dashboard from "../../dashboard/container/dashboard";

class Home extends Component {
    newOrder: OrderState = {
        id: 0,
        userType: 'VIP',
        dish: {duration: 60, id: 1, ingredients: ['meat'], title: 'burger'}
    }

    render() {
        return (
            <div className={homeStyles.app}>
                {/*Header*/}
                <div className={homeStyles.header}>

                    <div className={homeStyles.header_logo}>
                        <img src={logo} alt="Logo"/>
                    </div>

                    <div className={homeStyles.header_pageName}>Name Page</div>
                </div>

                {/*Body*/}
                <div className={homeStyles.appBody}>
                    {/*Navigation*/}
                    <div className={homeStyles.appBody_navigation}>
                        <div className={homeStyles.appBody_navigation_item}><Link to="/">Home</Link></div>
                        <div className={homeStyles.appBody_navigation_item}><Link to="/dashboard">dashboard</Link></div>
                        <div className={homeStyles.appBody_navigation_item}><Link to="/storage">storage</Link></div>
                    </div>

                    <div className={homeStyles.appBody_mainContent}>
                        <Dashboard order={this.newOrder}/>
                    </div>
                </div>

            </div>
        );
    }
}

export default Home;