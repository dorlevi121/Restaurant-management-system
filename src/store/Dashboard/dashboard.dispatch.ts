import * as dashboardActionsTypes from './dashboard.actions';
import {OrderState} from "../Order/order.types";


export const addOrderToQueue = (order: OrderState, dispatch:any) => {
    return dispatch({ type: dashboardActionsTypes.ADD_ORDER_TO_QUEUE, newOrder: order })
}