import React, {Component} from 'react';
import {queueListener} from "./manager-orders";
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
import {EventManager} from "./event.manager";


class AddNewOrderManager extends Component <PropsFromRedux> {

    constructor(props: any) {
        super(props);
        queueListener.on(EventManager.UPDATE_ORDER_STATUS, this.updateOrderStatus);
        queueListener.on(EventManager.ORDER_FINISHED, this.removeFromStore);
    }

    shouldComponentUpdate(nextProps: Readonly<PropsFromRedux>, nextState: Readonly<{}>, nextContext: any): boolean {
        return nextProps.getLastOrder !== this.props.getLastOrder;
    }

    componentDidUpdate(prevProps: Readonly<PropsFromRedux>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.getPriorityArr.length !== this.props.getPriorityArr.length) {
            const newOrder = this.props.getLastOrder;
            const findPriority = (o: OrderType) => o.id === newOrder.id
            const priority = prevProps.getPriorityArr.findIndex(findPriority);
            const a:{ myOrder: number, myDishes: [number, number] }[] = [];
            for(let i =0; i<newOrder.dish.length; i++)
                a.push({myOrder: newOrder.id, myDishes: [i, newOrder.dish.length-1]})
            queueListener.addNewOrderToPend({id: newOrder.id, priority: priority, ttl: newOrder.totalTime,
                dishes:a})
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