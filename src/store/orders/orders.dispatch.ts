import {Dispatch} from "redux";
import {OrderActionsEnum} from "./order.actions";
import {OrderType} from "../../models/system/order.model";
import {OrderStatus} from "../../models/system/order-status.model";
import {OrderState} from "./order.types";

export const dispatchAddNewOrderToQueue = (newOrder: OrderType, dispatch: Dispatch) => {
    return dispatch({ type: OrderActionsEnum.ADD_NEW_ORDER_TO_QUEUE, newOrder: newOrder })
}

export const dispatchRemoveOrderFromQueue = (removeOrder: OrderType, dispatch: Dispatch) => {
    return dispatch({ type: OrderActionsEnum.REMOVE_ORDER_FROM_QUEUE, removeOrder: removeOrder })
}


export const dispatchRemoveOrderFromPriority = (removeOrder: OrderType, dispatch: Dispatch) => {
    return dispatch({ type: OrderActionsEnum.REMOVE_ORDER_FROM_PRIORITY, removeOrder: removeOrder })
}

export const dispatchAddNewOrderToHistory = (newOrder: OrderType, dispatch: Dispatch) => {
    return dispatch({ type: OrderActionsEnum.ADD_NEW_ORDER_TO_HISTORY, newOrder: newOrder })
}

export const dispatchChangeStatus = (status: OrderStatus, order: OrderType, dispatch: Dispatch) => {
    return dispatch({ type: OrderActionsEnum.CHANGE_STATUS, order: order, status: status })
}






// export const dispatchAddNewOrderToDelivery = (newOrder: OrderType, dispatch: Dispatch) => {
//     return dispatch({ type: OrderActionsEnum.ADD_ORDER_TO_DELIVERY, newOrder: newOrder })
// }
//
// export const dispatchRemoveOrderFromDelivery = (removeOrder: OrderType, dispatch: Dispatch) => {
//     return dispatch({ type: OrderActionsEnum.REMOVE_ORDER_FROM_DELIVERY, removeOrder: removeOrder })
// }
// export const dispatchAddNewOrderToKitchen = (newOrder: OrderType, dispatch: Dispatch) => {
//     return dispatch({ type: OrderActionsEnum.ADD_ORDER_TO_KITCHEN, newOrder: newOrder })
// }
//
// export const dispatchRemoveOrderFromKitchen = (removeOrder: OrderType, dispatch: Dispatch) => {
//     return dispatch({ type: OrderActionsEnum.REMOVE_ORDER_FROM_KITCHEN, removeOrder: removeOrder })
// }
