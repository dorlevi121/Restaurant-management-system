import React, {Component} from 'react';
import homeStyles from "./home.module.scss";
import logo from "../../../assets/logo/logo.png";
import {Link} from "react-router-dom";
import {OrderState} from "../../../store/Order/order.types";
import Dashboard from "../../dashboard/container/dashboard";
import Dishes from "../../../assets/dishes/allDishes";
import Order from "../../order/container/order";

class Home extends Component {
    newOrder: OrderState = {
        id: 0,
        userType: 'VIP',
        dish: Dishes[0]
    }

    render() {
        return (
            <div className={homeStyles.App}>
                {/*Header*/}
                <div className={homeStyles.Header}>

                    <div className={homeStyles.Logo}>
                        <img src={logo} alt="Logo"/>
                    </div>

                    <div className={homeStyles.PageName}>Name Page</div>
                </div>

                {/*Navigation*/}
                <div className={homeStyles.AppBody}>
                    <div className={homeStyles.Navigation}>
                        <div className={homeStyles.Item}><Link to="/">Home</Link></div>
                        <div className={homeStyles.Item}><Link to="/order">Order</Link></div>
                        <div className={homeStyles.Item}><Link to="/dashboard">dashboard</Link></div>
                        <div className={homeStyles.Item}><Link to="/storage">storage</Link></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;