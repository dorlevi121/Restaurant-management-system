import { DishInterface } from "../../models/system/dish.model";

export interface QueueState {
    OrdersIdInQueue: string [],
    dishesInKitchen: DishInterface [],
    OrdersIdInDelivery: string []
}

export enum QueueActionsEnum {
    ADD_NEW_ORDER_ID_TO_QUEUE = 'ADD_NEW_ORDER_ID_TO_QUEUE',
    REMOVE_ORDER_ID_QUEUE = 'REMOVE_ORDER_ID_QUEUE',
    ADD_NEW_KITCHEN_LIST = 'ADD_NEW_KITCHEN_LIST',
    ADD_NEW_ORDER_ID_TO_DELIVERY = 'ADD_NEW_ORDER_ID_TO_DELIVERY',
    REMOVE_ORDER_ID_FROM_DELIVERY = 'REMOVE_ORDER_ID_FROM_DELIVERY'
}

export interface queueActionPattern {
    type: QueueActionsEnum; //Enum of actions
}

export interface addNewOrderIdToQueueActionType extends queueActionPattern {
    type: QueueActionsEnum.ADD_NEW_ORDER_ID_TO_QUEUE;
    OrderId: string;
    index: number
}

export interface removeOrderIdFromQueueActionType extends queueActionPattern {
    type: QueueActionsEnum.REMOVE_ORDER_ID_QUEUE;
    OrderId: string;
}

export interface addNewKitchenListActionType extends queueActionPattern {
    type: QueueActionsEnum.ADD_NEW_KITCHEN_LIST;
    dishes: DishInterface [];
}

export interface addNewOrderIdToDeliveryActionType extends queueActionPattern {
    type: QueueActionsEnum.ADD_NEW_ORDER_ID_TO_DELIVERY;
    OrderId: string;
}

export interface removeOrderIdFromDeliveryActionType extends queueActionPattern {
    type: QueueActionsEnum.REMOVE_ORDER_ID_FROM_DELIVERY;
    OrderId: string;
}