import React, {Component} from 'react';
import {queueListener} from "./EventEmitter";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";

import {OrderState} from "../store/orders/order.types";
import {OrderType} from "../models/system/order.model";
import {getLastOrder, getOrdersNumber, getOrdersPriority} from "../store/orders/order.selectors";
import {
    dispatchAddNewOrderToQueue,
    dispatchChangeStatus,
    dispatchRemoveOrderFromPriority,
    dispatchRemoveOrderFromQueue
} from "../store/orders/orders.dispatch";
import {OrderStatus} from "../models/system/order-status.model";


class AddNewOrderManager extends Component <PropsFromRedux> {

    constructor(props: any) {
        super(props);
        queueListener.on('new order to kitchen', queueListener.addToKitchen);
        queueListener.on('update order status', this.updateOrderStatus);
        queueListener.on('order finished', this.removeFromStore);
    }

    shouldComponentUpdate(nextProps: Readonly<PropsFromRedux>, nextState: Readonly<{}>, nextContext: any): boolean {
        if (nextProps.getLastOrder !== this.props.getLastOrder)
            return true;

        return false;
    }

    componentDidUpdate(prevProps: Readonly<PropsFromRedux>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.getPriorityArr.length !== this.props.getPriorityArr.length) {
            const newOrder = this.props.getLastOrder;
            const findPriority = (o: OrderType) => o.id === newOrder.id
            const priority = prevProps.getPriorityArr.findIndex(findPriority);
            queueListener.addNewOrderToPend({id: newOrder.id, priority: priority, ttl: newOrder.totalTime})
        }
    }

    updateOrderStatus = (orderId: number, status: OrderStatus): void => {
        const found = this.props.getPriorityArr.find((order: OrderType) => order.id === orderId);
        this.props.changeOrderStatus(status, found);
    }

    removeFromStore = (orderId: number) => {
        this.props.removeOrderFromPriority(this.props.getPriorityArr
            .find((order: OrderType) => order.id === orderId))
    }


    render() {
        return null;
    }
}

const mapStateToProps = (state: OrderState) => {
    return {
        getOrdersNumber: getOrdersNumber(state),
        getPriorityArr: getOrdersPriority(state),
        getLastOrder: getLastOrder(state),
        getNumberOfOrders: getOrdersNumber(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addNewOrderToQueue: (order: OrderType) => dispatchAddNewOrderToQueue(order, dispatch),
        removeOrderFromQueue: (order: OrderType) => dispatchRemoveOrderFromQueue(order, dispatch),
        changeOrderStatus: (status: OrderStatus, order: OrderType) => dispatchChangeStatus(status, order, dispatch),
        removeOrderFromPriority: (order: OrderType) => dispatchRemoveOrderFromPriority(order, dispatch)
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(AddNewOrderManager);