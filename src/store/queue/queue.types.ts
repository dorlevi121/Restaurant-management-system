import { DishType } from "../../models/system/dish.model";
import { QueueActionsEnum } from "./queue.actions";


export interface QueueState {
    OrdersIdInQueue: number [],
    dishesInKitchen: DishType [],
    OrdersIdInDelivery: number []
}

export interface queueActionPattern {
    type: QueueActionsEnum; //Enum of actions
}

export interface addNewItemToQueueActionType extends queueActionPattern {
    type: QueueActionsEnum.ADD_NEW_ITEM_TO_QUEUE;
    OrderId: number;
    index: number
}

export interface removeItemFromQueueActionType extends queueActionPattern {
    type: QueueActionsEnum.REMOVE_ITEM_FROM_QUEUE;
    OrderId: number;
}

export interface addNewKitchenListActionType extends queueActionPattern {
    type: QueueActionsEnum.ADD_NEW_KITCHEN_LIST;
    dishes: DishType [];
}

export interface addNewItemToDeliveryActionType extends queueActionPattern {
    type: QueueActionsEnum.ADD_NEW_ITEM_TO_DELIVERY;
    OrderId: number;
}

export interface removeItemFromDeliveryActionType extends queueActionPattern {
    type: QueueActionsEnum.REMOVE_ITEM_FROM_DELIVERY;
    OrderId: number;
}