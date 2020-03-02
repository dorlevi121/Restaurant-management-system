import {Component} from 'react';
import {queueListener} from "./manager-orders";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";

import {OrderState} from "../store/orders/order.types";
import {OrderType} from "../models/system/order.model";
import {getLastOrder, getOrderCancel} from "../store/orders/order.selectors";
import {EventManager} from "./event.manager";
import {isEqual} from "lodash";
import { DishType } from '../models/system/dish.model';
import { dispatchAddNewItemToQueue, dispatchAddNewKitchenList, dispatchRemoveItemFromQueue, dispatchAddNewItemToDelivery, dispatchRemoveItemFromDelivery } from '../store/queue/queue.dispatch';


class AddNewOrderManager extends Component <PropsFromRedux> {

    constructor(props: any) {
        super(props);
        queueListener.on(EventManager.ADD_NEW_ITEM_TO_QUEUE, this.addNewItemToQueue);
        queueListener.on(EventManager.REMOVE_ITEM_FROM_QUEUE, this.removeItemFromQueue);
        queueListener.on(EventManager.UPDATE_NEW_KITCHEN_LIST, this.updateNewKitchenList);
        queueListener.on(EventManager.ADD_NEW_ITEM_TO_DELIVERY, this.addNewItemToDelivery);
        queueListener.on(EventManager.REMOVE_ITEM_FROM_DELIVERY, this.removeItemFromDelivery);
    }

    shouldComponentUpdate(nextProps: Readonly<PropsFromRedux>, nextState: Readonly<{}>, nextContext: any): boolean {
        return (nextProps.getLastOrder !== this.props.getLastOrder) ||
            (nextProps.getOrderCancel !== this.props.getOrderCancel);
    }

    componentDidUpdate(prevProps: Readonly<PropsFromRedux>, prevState: Readonly<{}>, snapshot?: any): void {
        if (!isEqual(prevProps.getLastOrder, this.props.getLastOrder)) {
            const newOrder: OrderType = this.props.getLastOrder;
            const a: DishType[] = []

            for (let i = 0; i < newOrder.dish.length; i++) a.push(newOrder.dish[i])

            const item = {orderId: newOrder.id, userType: newOrder.userType, dishes: [...a], numOfReadyDishes: 0};
            queueListener.addNewOrderToPend(item);
        }

        else if (!isEqual(prevProps.getOrderCancel, this.props.getOrderCancel))
            queueListener.removeOrder(this.props.getOrderCancel.id);
    }


    addNewItemToQueue = (orderId: number, index: number) => this.props.addNewItemToQueue(orderId, index);
    

    removeItemFromQueue = (orderId: number) => this.props.removeItemFromQueue(orderId);
    

    updateNewKitchenList = (dishes: DishType[]) => this.props.updateNewKitchenList(dishes);


    addNewItemToDelivery = (orderId: number) => this.props.addNewItemToDelivery(orderId);
    

    removeItemFromDelivery = (orderId: number) => this.props.removeItemFromDelivery(orderId);
    

    render() { return null; }
}

const mapStateToProps = (state: OrderState) => {
    return {
        getLastOrder: getLastOrder(state),
        getOrderCancel: getOrderCancel(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addNewItemToQueue: (orderId: number, index: number) => dispatchAddNewItemToQueue(orderId, index, dispatch),
        removeItemFromQueue: (orderId: number) => dispatchRemoveItemFromQueue(orderId, dispatch),
        updateNewKitchenList: (dishes: DishType[]) => dispatchAddNewKitchenList(dishes, dispatch),
        addNewItemToDelivery: (orderId: number) => dispatchAddNewItemToDelivery(orderId, dispatch),
        removeItemFromDelivery: (orderId: number) => dispatchRemoveItemFromDelivery(orderId, dispatch)
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(AddNewOrderManager);