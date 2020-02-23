import {OrderState} from "../../Order/order.types";
import {DashboardState} from "../dashboard.types";
import {initialDashboardState} from "../dashboard.state";


export const addNewOrderToKitchen = (state: DashboardState = initialDashboardState, newOrder: OrderState) => {
    return {...state,
        ordersInKitchen: [...state.ordersInKitchen, newOrder], ordersPriority: [...state.ordersPriority]}
}

export const removeOrderFromKitchen = (state: DashboardState = initialDashboardState, orderToRemove: OrderState) => {
    return {...state,
        ordersPriority: [...state.ordersPriority.filter((order:OrderState) => order.id!==orderToRemove.id)],
        ordersInKitchen: [...state.ordersInKitchen]}
}

export const addOrdersPriority = (state: DashboardState = initialDashboardState, ordersPriority: OrderState[]) => {
    return {...state,
        ordersPriority: ordersPriority, ordersInKitchen: [...state.ordersInKitchen]}
}