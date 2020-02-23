import {OrderState} from "../Order/order.types";
import {SharedActionTypes} from './shared.actions';

//Type of Dashboard State
export interface sharedState {
    ordersInQueue: OrderState[],
    ordersNumber: number
}


export interface sharedBaseAction {
    type: SharedActionTypes;
}

export interface sharedActionAddOrder extends sharedBaseAction {
    type: SharedActionTypes.ADD_ORDER_TO_QUEUE;
    newOrder: OrderState;
}

export interface sharedActionRemoveOrder extends sharedBaseAction {
    type: SharedActionTypes.REMOVE_ORDER_FROM_QUEUE;
    removeOrder: OrderState;
}