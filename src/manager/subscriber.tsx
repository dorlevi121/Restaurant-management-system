import {Component} from 'react';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {getLastOrder, getOrderCancel} from "../store/orders/order.selectors";
import {OrderState} from "../store/orders/order.types";
import {DishInterface} from '../models/system/dish.model';
import {queueListener} from "./orders.manager";
import {OrdersEvents} from "./orders-events";
import {
    addNewOrderIdToDelivery,
    addNewOrderIdToQueue,
    addNewKitchenList,
    removeOrderIdFromDelivery, removeOrderIdFromQueue
} from "../store/queue/queue.actions";
import {OrderInterface} from "../models/system/order.model";
import composition from "../utils/composition";

interface OwnProps {
}

interface PropsFromState {
    getLastOrder: OrderInterface,
    getOrderCancel: number
}

interface PropsFromDispatch {
    addNewOrderIdToQueue: typeof addNewOrderIdToQueue,
    removeOrderIdFromQueue: typeof removeOrderIdFromQueue,
    updateNewKitchenList: typeof addNewKitchenList,
    addNewOrderIdToDelivery: typeof addNewOrderIdToDelivery,
    removeOrderIdFromDelivery: typeof removeOrderIdFromDelivery,
}

type AllProps = OwnProps
    & PropsFromState
    & PropsFromDispatch;
class Subscriber extends Component <AllProps> {

    constructor(props: any) {
        super(props);
        queueListener.on(OrdersEvents.ADD_NEW_ITEM_TO_QUEUE, this.addNewItemToQueue);
        queueListener.on(OrdersEvents.REMOVE_ITEM_FROM_QUEUE, this.removeItemFromQueue);
        queueListener.on(OrdersEvents.UPDATE_NEW_KITCHEN_LIST, this.updateNewKitchenList);
        queueListener.on(OrdersEvents.ADD_NEW_ITEM_TO_DELIVERY, this.addNewItemToDelivery);
        queueListener.on(OrdersEvents.REMOVE_ITEM_FROM_DELIVERY, this.removeItemFromDelivery);
    }

    shouldComponentUpdate(nextProps: Readonly<AllProps>, nextState: Readonly<{}>, nextContext: any): boolean {
        return (nextProps.getLastOrder !== this.props.getLastOrder) ||
            (nextProps.getOrderCancel !== this.props.getOrderCancel);
    }

    addNewItemToQueue = (orderId: string, index: number) => this.props.addNewOrderIdToQueue(orderId, index);

    removeItemFromQueue = (orderId: string) => this.props.removeOrderIdFromQueue(orderId);

    updateNewKitchenList = (dishes: DishInterface[]) => this.props.updateNewKitchenList(dishes);

    addNewItemToDelivery = (orderId: string) => this.props.addNewOrderIdToDelivery(orderId);

    removeItemFromDelivery = (orderId: string) => this.props.removeOrderIdFromDelivery(orderId);


    render() {
        return null;
    }
}

const mapStateToProps = (state: OrderState) => ({
    getLastOrder: getLastOrder(state),
    getOrderCancel: getOrderCancel(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addNewOrderIdToQueue: (orderId: string, index: number) => dispatch(addNewOrderIdToQueue(orderId, index)),
    removeOrderIdFromQueue: (orderId: string) => dispatch(removeOrderIdFromQueue(orderId)),
    updateNewKitchenList: (dishes: DishInterface[]) => dispatch(addNewKitchenList(dishes)),
    addNewOrderIdToDelivery: (orderId: string) => dispatch(addNewOrderIdToDelivery(orderId)),
    removeOrderIdFromDelivery: (orderId: string) => dispatch(removeOrderIdFromDelivery(orderId))
})



export default  composition<OwnProps>(
    // @ts-ignore
    Subscriber,
    connect(mapStateToProps, mapDispatchToProps)
);