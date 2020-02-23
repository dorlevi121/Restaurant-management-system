import React, {Component} from "react";

import orderStyle from './order.module.scss';
import Dishes from "../../shared/dishes/dishes";
import menu from "../../../assets/dishes/allDishes";
import * as getFromState from "../../../store/shared/shared.selectors";

import {sharedState} from "../../../store/shared/shared.types";
import {Dispatch} from "redux";
import {OrderState} from "../../../store/Order/order.types";
import {addOrderToQueue} from "../../../store/shared/shared.dispatch";
import {connect, ConnectedProps} from "react-redux";

class Order extends Component <PropsFromRedux>{

    addNewOrderToQueue = (dishId:number):void => {
        const dish = menu[dishId];
        const order: OrderState = {
            id: this.props.ordersNumber,
            dish: dish,
            userType: this.props.ordersNumber === 1 ? 'Regular':(this.props.ordersNumber%2===0? 'VIP': 'Member')
        }
        this.props.addOrderToQueue(order);
    }

    render() {
        return (
            <div className={orderStyle.Order}>
                <div className={orderStyle.Dishes}>
                    <div className={orderStyle.Dish}>
                    <Dishes addToQueue={this.addNewOrderToQueue}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: sharedState) => {
    return {
        ordersInQueue: getFromState.getOrdersInQueue(state),
        ordersNumber: getFromState.ordersNumber(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addOrderToQueue: (order:OrderState) => addOrderToQueue(order, dispatch)
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>


export default connector(Order);