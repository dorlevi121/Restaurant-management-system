import {OrderInterface} from "../../models/system/order.model";
import {DishInterface} from "../../models/system/dish.model";
import {UserType} from "../../models/system/user-type.enum";

export interface OrderState  {
    allOrders: {[id:string]: OrderInterface}, //all the orders
    ordersNumber: number, //Number Of orders
    lastOrder: OrderInterface | null, //Holds the last order
    orderCancel: OrderInterface | null // Holds the last order that cancel
}


export enum OrderActionsEnum {
    ADD_NEW_ORDER_TO_QUEUE = 'ADD_NEW_ORDER_TO_QUEUE',
    REMOVE_ORDER_FROM_QUEUE = 'REMOVE_ORDER_FROM_QUEUE',
    ORDER_CANCEL = 'ORDER_CANCEL'
}

export interface ordersActionPattern {
    type: OrderActionsEnum; //Enum of actions
}

export interface addNewOrderToQueueActionType extends ordersActionPattern {
    type: OrderActionsEnum.ADD_NEW_ORDER_TO_QUEUE;
    dishes: DishInterface [],
    userType: UserType
}

export interface removeOrderFromQueueActionType extends ordersActionPattern {
    type: OrderActionsEnum.REMOVE_ORDER_FROM_QUEUE;
    orderId: number
}

export interface addOrderCancelActionType extends ordersActionPattern {
    type: OrderActionsEnum.ORDER_CANCEL;
    orderId: number;
}