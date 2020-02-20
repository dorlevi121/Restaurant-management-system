import {SharedActionTypes} from './shared.actions';
import {OrderState} from "../Order/order.types";
import {Dispatch} from "redux";

export const addOrderToQueue = (order: OrderState, dispatch: Dispatch) => {
    return dispatch({ type: SharedActionTypes.ADD_ORDER_TO_QUEUE, newOrder: order })
}