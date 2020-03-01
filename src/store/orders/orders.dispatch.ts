import {Dispatch} from "redux";
import {OrderActionsEnum} from "./order.actions";
import {OrderType} from "../../models/system/order.model";
import {OrderStatus} from "../../models/system/order-status.model";

export const dispatchAddNewOrderToQueue = (newOrder: OrderType, dispatch: Dispatch) => {
    return dispatch({ type: OrderActionsEnum.ADD_NEW_ORDER_TO_QUEUE, newOrder: newOrder })
}

export const dispatchRemoveOrderFromQueue = (orderId: number, dispatch: Dispatch) => {
    return dispatch({ type: OrderActionsEnum.REMOVE_ORDER_FROM_QUEUE, orderId: orderId })
}


export const dispatchAddNewOrderToHistory = (newOrder: OrderType, dispatch: Dispatch) => {
    return dispatch({ type: OrderActionsEnum.ADD_NEW_ORDER_TO_HISTORY, newOrder: newOrder })
}

export const dispatchChangeStatus = (orderId: number, status: OrderStatus, dispatch: Dispatch) => {
    return dispatch({ type: OrderActionsEnum.CHANGE_STATUS, orderId: orderId, status: status })
}

export const dispatchAddNewOrderToCancel = (orderId: number, dispatch: Dispatch) => {
    return dispatch({ type: OrderActionsEnum.ORDER_CANCEL, orderId: orderId })
}