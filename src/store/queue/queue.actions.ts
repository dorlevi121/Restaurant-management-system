import { DishInterface } from "../../models/system/dish.model";
import {QueueActionsEnum} from "./queue.types";


export const addNewOrderIdToQueue = (OrderId: string, index: number) => {
    return { type: QueueActionsEnum.ADD_NEW_ORDER_ID_TO_QUEUE, OrderId: OrderId , index: index};
}

export const removeOrderIdFromQueue = (OrderId: string) => {
    return { type: QueueActionsEnum.REMOVE_ORDER_ID_QUEUE, OrderId: OrderId };
}

export const addNewKitchenList= (dishes: DishInterface []) => {
    return { type: QueueActionsEnum.ADD_NEW_KITCHEN_LIST, dishes: dishes };
}

export const addNewOrderIdToDelivery = (OrderId: string) => {
    return { type: QueueActionsEnum.ADD_NEW_ORDER_ID_TO_DELIVERY, OrderId: OrderId };
}

export const removeOrderIdFromDelivery = (OrderId: string) => {
    return { type: QueueActionsEnum.REMOVE_ORDER_ID_FROM_DELIVERY, OrderId: OrderId };
}