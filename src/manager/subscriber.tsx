import {Component} from 'react';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {getLastOrder, getOrderCancel} from "../store/orders/order.selectors";
import {OrderState} from "../store/orders/order.types";
import {DishInterface} from '../models/system/dish.model';
import {queueListener} from "./orders.manager";
import {OrdersEvents} from "./orders-events";
import {
    addNewItemsToDelivery,
    addNewItemsToQueue,
    addNewKitchenList,
    removeItemsFromDelivery,
    removeItemsFromQueue
} from "../store/queue/queue.actions";
import {OrderInterface} from "../models/system/order.model";
import composition from "../utils/composition";
import {ItemInterface} from "../models/system/item.model";

interface OwnProps {
}

interface PropsFromState {
    getLastOrder: OrderInterface,
    getOrderCancel: number
}

interface PropsFromDispatch {
    addNewItemToQueue: typeof addNewItemsToQueue,
    removeItemFromQueue: typeof removeItemsFromQueue,
    updateNewKitchenList: typeof addNewKitchenList,
    addNewItemToDelivery: typeof addNewItemsToDelivery,
    removeItemFromDelivery: typeof removeItemsFromDelivery,
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

    addNewItemToQueue = (item: ItemInterface, index: number) => this.props.addNewItemToQueue(item, index);

    removeItemFromQueue = (item: ItemInterface) => this.props.removeItemFromQueue(item);

    updateNewKitchenList = (item: DishInterface[]) => this.props.updateNewKitchenList(item);

    addNewItemToDelivery = (item: ItemInterface) => this.props.addNewItemToDelivery(item);

    removeItemFromDelivery = (item: ItemInterface) => this.props.removeItemFromDelivery(item);


    render() {
        return null;
    }
}

const mapStateToProps = (state: OrderState) => ({
    getLastOrder: getLastOrder(state),
    getOrderCancel: getOrderCancel(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addNewItemToQueue: (item: ItemInterface, index: number) => dispatch(addNewItemsToQueue(item, index)),
    removeItemFromQueue: (item: ItemInterface) => dispatch(removeItemsFromQueue(item)),
    updateNewKitchenList: (item: DishInterface[]) => dispatch(addNewKitchenList(item)),
    addNewItemToDelivery: (item: ItemInterface) => dispatch(addNewItemsToDelivery(item)),
    removeItemFromDelivery: (item: ItemInterface) => dispatch(removeItemsFromDelivery(item))
})


export default composition<OwnProps>(
    // @ts-ignore
    Subscriber,
    connect(mapStateToProps, mapDispatchToProps)
);