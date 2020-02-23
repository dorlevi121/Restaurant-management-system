import {SharedActionTypes} from './shared.actions';
import {OrderState} from "../Order/order.types";
import {Dispatch} from "redux";

export const addOrderToQueue = (newOrder: OrderState, dispatch: Dispatch) => {
    return dispatch({ type: SharedActionTypes.ADD_ORDER_TO_QUEUE, newOrder: newOrder })
}

export const RemoveOrderFromQueue = (removeOrder: OrderState, dispatch: Dispatch) => {
    return dispatch({ type: SharedActionTypes.REMOVE_ORDER_FROM_QUEUE, removeOrder: removeOrder })
}