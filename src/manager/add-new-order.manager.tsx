import {Component} from 'react';
import {queueListener} from "./manager-orders";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";

import {OrderState} from "../store/orders/order.types";
import {OrderType} from "../models/system/order.model";
import {getLastOrder, getOrderCancel, getOrdersNumber} from "../store/orders/order.selectors";
import {
    dispatchAddNewOrderToQueue,
    dispatchChangeStatus,
    dispatchRemoveOrderFromQueue
} from "../store/orders/orders.dispatch";
import {OrderStatus} from "../models/system/order-status.model";
import {EventManager} from "./event.manager";
import {isEqual} from "lodash";


class AddNewOrderManager extends Component <PropsFromRedux> {

    constructor(props: any) {
        super(props);
        queueListener.on(EventManager.UPDATE_ORDER_STATUS, this.updateOrderStatus);
        queueListener.on(EventManager.ORDER_FINISHED, this.removeOrderFromStore);
    }

    shouldComponentUpdate(nextProps: Readonly<PropsFromRedux>, nextState: Readonly<{}>, nextContext: any): boolean {
        return (nextProps.getLastOrder !== this.props.getLastOrder) ||
            (nextProps.getOrderCancel !== this.props.getOrderCancel);
    }

    componentDidUpdate(prevProps: Readonly<PropsFromRedux>, prevState: Readonly<{}>, snapshot?: any): void {
        if (!isEqual(prevProps.getLastOrder, this.props.getLastOrder)) {
            const newOrder = this.props.getLastOrder;
            const a: { myOrder: number, myDishes: [number, number] }[] = [];
            for (let i = 0; i < newOrder.dish.length; i++)
                a.push({myOrder: newOrder.id, myDishes: [i, newOrder.dish.length - 1]})
            queueListener.addNewOrderToPend({
                id: newOrder.id, priority: newOrder.userType, ttl: newOrder.totalTime,
                dishes: a });
        }
        else if (!isEqual(prevProps.getOrderCancel, this.props.getOrderCancel))
            queueListener.removeOrder(this.props.getOrderCancel.id);


    }

    updateOrderStatus = (orderId: number, status: OrderStatus): void => {
        this.props.changeOrderStatus(orderId, status);
    }

    removeOrderFromStore = (orderId: number) => {
        this.props.removeOrderFromQueue(orderId);
    }


    render() {
        return null;
    }
}

const mapStateToProps = (state: OrderState) => {
    return {
        getOrdersNumber: getOrdersNumber(state),
        getLastOrder: getLastOrder(state),
        getOrderCancel: getOrderCancel(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addNewOrderToQueue: (order: OrderType) => dispatchAddNewOrderToQueue(order, dispatch),
        removeOrderFromQueue: (orderId: number) => dispatchRemoveOrderFromQueue(orderId, dispatch),
        changeOrderStatus: (orderId: number, status: OrderStatus) => dispatchChangeStatus(orderId, status, dispatch)
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(AddNewOrderManager);