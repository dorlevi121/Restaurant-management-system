import React, {Component} from "react";
import orderStyle from './Order.module.scss';
import Dishes from "../../shared/Dishes/Dishes";
import {sharedState} from "../../../store/shared/shared.types";
import * as getFromState from "../../../store/shared/shared.selectors";
import {Dispatch} from "redux";
import {OrderState} from "../../../store/Order/order.types";
import {addOrderToQueue} from "../../../store/Dashboard/dashboard.dispatch";
import {connect, ConnectedProps} from "react-redux";
import menu from "../../../assets/dishes/allDishes";
import {dashboardActionTypes} from "../../../store/Dashboard/dashboard.actions";

class Order extends Component <PropsFromRedux>{

    addNewOrderToQueue = (dishId:number):void => {
        const dish = menu[dishId];
        const order: OrderState = {
            id: this.props.ordersNumber,
            dish: dish,
            userType: 'regular'
        }
        this.props.addOrderToQueue(order);
    }

    render() {
        return (
            <div className={orderStyle.order}>
                <div className={orderStyle.order_dishes}>
                    <div className={orderStyle.order_dishes_dish}>
                    </div>
                    <Dishes addToQueue={this.addNewOrderToQueue}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: sharedState) => {
    return {
        ordersInQueue: getFromState.ordersInQueue(state),
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