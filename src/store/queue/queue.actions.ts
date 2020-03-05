import { DishInterface } from "../../models/system/dish.model";
import {QueueActionsEnum} from "./queue.types";
import {ItemInterface} from "../../models/system/item.model";


export const addNewItemsToQueue = (item: ItemInterface, index: number) => {
    return { type: QueueActionsEnum.ADD_NEW_ITEM_TO_QUEUE, item: item , index: index};
}

export const removeItemsFromQueue = (item: ItemInterface) => {
    return { type: QueueActionsEnum.REMOVE_ITEM_QUEUE, item: item };
}

export const addNewKitchenList= (dishes: DishInterface []) => {
    return { type: QueueActionsEnum.ADD_NEW_KITCHEN_LIST, dishes: dishes };
}

export const addNewItemsToDelivery = (item: ItemInterface) => {
    return { type: QueueActionsEnum.ADD_NEW_ITEM_TO_DELIVERY, item: item };
}

export const removeItemsFromDelivery = (item: ItemInterface) => {
    return { type: QueueActionsEnum.REMOVE_ITEM_FROM_DELIVERY, item: item };
}