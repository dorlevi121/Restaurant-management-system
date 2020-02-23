import {OrderState} from "../Order/order.types";
import {DashboardActionTypes} from './dashboard.actions';

//Type of Dashboard State
export interface DashboardState {
    ordersInKitchen: OrderState[],
    ordersPriority: OrderState []
   // ordersInDelivery: OrderState[]
}


export interface dashboardBaseAction {
    type: DashboardActionTypes;
}

export interface dashboardActionAddOrderToKitchen extends dashboardBaseAction {
     type: DashboardActionTypes.ADD_ORDER_TO_KITCHEN;
     newOrder: OrderState;
}

export interface dashboardActionOrdersPriority extends dashboardBaseAction {
    type: DashboardActionTypes.PRIORITY_ORDERS_KITCHEN;
    ordersPriority: OrderState[];
}

export interface dashboardActionRemoveOrderFromKitchen extends dashboardBaseAction {
    type: DashboardActionTypes.REMOVE_ORDER_FROM_KITCHEN;
    orderToRemove: OrderState;
}