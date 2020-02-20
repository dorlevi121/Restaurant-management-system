import {OrderState} from "../Order/order.types";
import {dashboardActionTypes} from './dashboard.actions';

//Type of Dashboard State
export interface DashboardState {
    ordersInKitchen: OrderState[],
    ordersInDelivery: OrderState[]
}


export interface dashboardBaseAction {
    type: dashboardActionTypes;
}

export interface dashboardAction extends dashboardBaseAction {
    // type: dashboardActionTypes.ADD_ORDER_TO_QUEUE;
    // newOrder: OrderState;
}