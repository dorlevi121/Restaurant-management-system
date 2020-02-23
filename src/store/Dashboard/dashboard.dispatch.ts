import {DashboardActionTypes} from './dashboard.actions';
import {OrderState} from "../Order/order.types";
import {Dispatch} from "redux";

export const addOrderToKitchen = (order: OrderState, dispatch: Dispatch) => {
    return dispatch({ type: DashboardActionTypes.ADD_ORDER_TO_KITCHEN, newOrder: order })
}

export const RemoveOrderFromKitchen = (order: OrderState, dispatch: Dispatch) => {
    return dispatch({ type: DashboardActionTypes.REMOVE_ORDER_FROM_KITCHEN, orderToRemove: order })
}

export const addOrdersPriority = (ordersPriority: OrderState[], dispatch: Dispatch) => {
    return dispatch({ type: DashboardActionTypes.PRIORITY_ORDERS_KITCHEN, ordersPriority: ordersPriority })
}