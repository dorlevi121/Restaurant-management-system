import {OrderType} from "../../models/system/order.model";
import {OrderActionsEnum} from "./order.actions";
import {OrderStatus} from "../../models/system/order-status.model";

export interface OrderState  {
    allOrders: {[id:number]: OrderType}, //all the orders
    ordersHistory: {[id:number]: OrderType}, //all the orders that delivered
    ordersNumber: number, //Number Of orders
    lastOrder: OrderType | null, //Holds the last order
    orderCancel: OrderType | null // Holds the last order that cancel
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
    orderId: number
}


export interface addOrderToHistoryActionType extends ordersActionPattern {
    type: OrderActionsEnum.ADD_NEW_ORDER_TO_HISTORY;
    newOrder: OrderType;
}

export interface changeStatusActionType extends ordersActionPattern {
    type: OrderActionsEnum.CHANGE_STATUS;
    status: OrderStatus;
    orderId: number
}


export interface addOrderCancelActionType extends ordersActionPattern {
    type: OrderActionsEnum.ORDER_CANCEL;
    orderId: number;
}