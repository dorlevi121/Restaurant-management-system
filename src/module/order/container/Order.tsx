import React, {Component} from "react";
import orderStyle from './Order.module.scss';
import Dishes from "../../shared/Dishes/Dishes";


class Order extends Component {

    render() {

        return (
            <div className={orderStyle.order}>
                <div className={orderStyle.order_dishes}>
                    <div className={orderStyle.order_dishes_dish}>
                    </div>
                    <Dishes/>
                </div>
            </div>
        );
    }
}

export default Order;