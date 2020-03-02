import React, {Component} from "react";
import dashboardStyle from './dashboard.module.scss';
//redux
import {Dispatch} from "redux";
import {connect, ConnectedProps} from "react-redux";

import Queue from "../component/queue/queue.dashboard";
import {getAllOrders} from "../../../store/orders/order.selectors";
import {OrderState} from "../../../store/orders/order.types";
import {dispatchAddNewOrderToCancel} from "../../../store/orders/orders.dispatch";
import Kitchen from "../component/kitchen/kitchen.dashboard";
import { getOrdersIdInQueue, getDishesInKitchen, getOrdersIdInDelivery } from "../../../store/queue/queue.selectors";
import { ItemType } from "../../../models/system/item.modal";
import { OrderType } from "../../../models/system/order.model";

class Dashboard extends Component<PropsFromRedux> {

    cancelOrder = (orderId: number | null): void => {
        if (orderId !== null)
            this.props.cancelOrder(orderId)
    }

    itemsToOrders = (items: number[]): OrderType[] => {
        const orders: OrderType[] = [];
        if(items===undefined) return orders;
        for(let i=0; i<items.length; i++){
            orders.push(this.props.getAllOrders[items[i]]);
            console.log('items[i]: ' + items[i]);
            
        }
        console.log('items: ' + items);
        console.log('orders: ' + orders);

        return orders;
    }

    render() {       
         
        return (
            <div className={dashboardStyle.dashboard}>
                <div className={dashboardStyle.Queues}>
                    <Queue cancelOrder={this.cancelOrder} ordersList={this.itemsToOrders(this.props.getOrdersIdInQueue)}/>
                </div>
                {/*<Kitchen/>*/}
                <div className={dashboardStyle.Kitchen}>
                    <Kitchen dishesList={this.props.getDishesInKitchen}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: OrderState) => {
    return {
        getAllOrders: getAllOrders(state), // Dictionary of OrderType
        getOrdersIdInQueue: getOrdersIdInQueue(state), //Array of orders id
        getDishesInKitchen: getDishesInKitchen(state), //Array of DishType
        getOrdersIdInDelivery: getOrdersIdInDelivery(state) //Array of orders id
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        cancelOrder: (orderId: number) => dispatchAddNewOrderToCancel(orderId, dispatch)
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Dashboard);