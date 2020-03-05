import { DishInterface } from "../../models/system/dish.model";
import {ItemInterface} from "../../models/system/item.model";

export interface QueueState {
    itemsInQueue: ItemInterface [],
    dishesInKitchen: DishInterface [],
    itemsInDelivery: ItemInterface []
}

export enum QueueActionsEnum {
    ADD_NEW_ITEM_TO_QUEUE = 'ADD_NEW_ITEM_TO_QUEUE',
    REMOVE_ITEM_QUEUE = 'REMOVE_ITEM_QUEUE',
    ADD_NEW_KITCHEN_LIST = 'ADD_NEW_KITCHEN_LIST',
    ADD_NEW_ITEM_TO_DELIVERY = 'ADD_NEW_ITEM_TO_DELIVERY',
    REMOVE_ITEM_FROM_DELIVERY = 'REMOVE_ITEM_FROM_DELIVERY'
}

export interface queueActionPattern {
    type: QueueActionsEnum; //Enum of actions
}

export interface addNewItemToQueueActionType extends queueActionPattern {
    type: QueueActionsEnum.ADD_NEW_ITEM_TO_QUEUE;
    item: ItemInterface;
    index: number
}

export interface removeItemFromQueueActionType extends queueActionPattern {
    type: QueueActionsEnum.REMOVE_ITEM_QUEUE;
    item: ItemInterface;
}

export interface addNewKitchenListActionType extends queueActionPattern {
    type: QueueActionsEnum.ADD_NEW_KITCHEN_LIST;
    dishes: DishInterface [];
}

export interface addNewItemToDeliveryActionType extends queueActionPattern {
    type: QueueActionsEnum.ADD_NEW_ITEM_TO_DELIVERY;
    item: ItemInterface;
}

export interface removeItemFromDeliveryActionType extends queueActionPattern {
    type: QueueActionsEnum.REMOVE_ITEM_FROM_DELIVERY;
    item: ItemInterface;
}