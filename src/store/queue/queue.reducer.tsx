import { initialQueueState } from "./queue.state";
import {
    addNewItemToDeliveryActionType,
    removeItemFromDeliveryActionType,
    removeItemFromQueueActionType,
    addNewKitchenListActionType,
    QueueActionsEnum, addNewItemToQueueActionType
} from "./queue.types";
import { cloneDeep } from "lodash";
import { addNewItemoQueue } from "./reducers/add-new-item-to-queue.reducer";
import { removeItemFromDelivery } from "./reducers/remove-item-from-delivery.reducer";
import { removeItemFromQueue } from "./reducers/remove-item-from-queue.reducer";


type allQueueActionTypes = addNewItemToDeliveryActionType | removeItemFromDeliveryActionType |
addNewItemToQueueActionType | removeItemFromQueueActionType | addNewKitchenListActionType;

export const queueReducer = (state = initialQueueState, action: allQueueActionTypes) => {

    switch (action.type){
        case QueueActionsEnum.ADD_NEW_ITEM_TO_QUEUE:
            return addNewItemoQueue(action, state);
        
        case QueueActionsEnum.REMOVE_ITEM_QUEUE:
            return removeItemFromQueue(action, state);

        case QueueActionsEnum.ADD_NEW_KITCHEN_LIST:
            const dishes = cloneDeep(action.dishes)
            return {...state, dishesInKitchen: dishes}

        case QueueActionsEnum.ADD_NEW_ITEM_TO_DELIVERY:
            return {...state, itemsInDelivery: [...state.itemsInDelivery, action.item]}
            
        case QueueActionsEnum.REMOVE_ITEM_FROM_DELIVERY:
            return removeItemFromDelivery(action, state);

    }
    return state;
        
}