import {sharedState} from "./shared.types";
import {OrderState} from "../Order/order.types";

export const addNewOrderToQueue = (state: sharedState, newOrder: OrderState) => {
    return {...state,
        ordersInQueue: [...state.ordersInQueue, newOrder], newOrder: state.ordersNumber+1}
}