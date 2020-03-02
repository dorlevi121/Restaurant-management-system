import {Dispatch} from "redux";
import { QueueActionsEnum } from "./queue.actions"
import { DishType } from "../../models/system/dish.model";


export const dispatchAddNewItemToQueue = (OrderId: number, index: number, dispatch: Dispatch) => {
    return dispatch({ type: QueueActionsEnum.ADD_NEW_ITEM_TO_QUEUE, OrderId: OrderId , index: index})
}

export const dispatchRemoveItemFromQueue = (OrderId: number, dispatch: Dispatch) => {
    return dispatch({ type: QueueActionsEnum.REMOVE_ITEM_FROM_QUEUE, OrderId: OrderId })
}

export const dispatchAddNewKitchenList= (dishes: DishType [], dispatch: Dispatch) => {
    return dispatch({ type: QueueActionsEnum.REMOVE_ITEM_FROM_QUEUE, dishes: dishes })
}

export const dispatchAddNewItemToDelivery = (OrderId: number, dispatch: Dispatch) => {
    return dispatch({ type: QueueActionsEnum.ADD_NEW_ITEM_TO_DELIVERY, OrderId: OrderId })
}

export const dispatchRemoveItemFromDelivery = (OrderId: number, dispatch: Dispatch) => {
    return dispatch({ type: QueueActionsEnum.REMOVE_ITEM_FROM_DELIVERY, OrderId: OrderId })
}