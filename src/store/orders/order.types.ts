import {OrderType} from "../../models/system/order.model";
import {OrderActionsEnum} from "./order.actions";
import {OrderStatus} from "../../models/system/order-status.model";

export interface OrderState  {
    allOrders: {[id:number]: OrderType}, //all the orders
    ordersPriority: OrderType[], // All orders are sorted
    ordersInKitchen: OrderType[], //The orders in kitchen
    ordersInDelivery: OrderType[], //The orders in delivery
    ordersHistory: {[id:number]: OrderType}, //all the orders that delivered
    ordersNumber: number, //Number Of orders
}

export interface ordersActionPattern {
    type: OrderActionsEnum; //Enum of actions
}

export interface addNewOrderToQueueActionType extends ordersActionPattern {
    type: OrderActionsEnum.ADD_NEW_ORDER_TO_QUEUE;
    newOrder: OrderType;
}

export interface removeOrderFromQueueActionType extends ordersActionPattern {
    type: OrderActionsEnum.REMOVE_ORDER_FROM_QUEUE;
    removeOrder: OrderType;
}

export interface addOrderToPriorityActionType extends ordersActionPattern {
    type: OrderActionsEnum.ADD_NEW_ORDER_TO_PRIORITY;
    newOrder: OrderType;
}

export interface removeOrderFromPriorityActionType extends ordersActionPattern {
    type: OrderActionsEnum.REMOVE_ORDER_FROM_PRIORITY;
    removeOrder: OrderType;
}

export interface addOrderToKitchenActionType extends ordersActionPattern {
    type: OrderActionsEnum.ADD_ORDER_TO_KITCHEN;
    newOrder: OrderType;
}

export interface removeOrderFromKitchenActionType extends ordersActionPattern {
    type: OrderActionsEnum.REMOVE_ORDER_FROM_KITCHEN;
    removeOrder: OrderType;
}

export interface addOrderToDeliveryActionType extends ordersActionPattern {
    type: OrderActionsEnum.ADD_ORDER_TO_DELIVERY;
    newOrder: OrderType;
}

export interface removeOrderFromDeliveryActionType extends ordersActionPattern {
    type: OrderActionsEnum.REMOVE_ORDER_FROM_DELIVERY;
    removeOrder: OrderType;
}

export interface addOrderToHistoryActionType extends ordersActionPattern {
    type: OrderActionsEnum.ADD_NEW_ORDER_TO_HISTORY;
    newOrder: OrderType;
}

export interface changeStatusActionType extends ordersActionPattern {
    type: OrderActionsEnum.CHANGE_STATUS;
    status: OrderStatus;
    order: OrderType
}