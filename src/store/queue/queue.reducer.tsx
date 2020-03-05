import { initialQueueState } from "./queue.state";
import {
    addNewItemToDeliveryActionType,
    removeItemFromDeliveryActionType,
    removeItemFromQueueActionType,
    addNewKitchenListActionType,
    QueueActionsEnum, addNewItemToQueueActionType
} from "./queue.types";
import { cloneDeep } from "lodash";
import {addNewOrderIdToQueue} from "./reducers/add-new-order-id-to-queue.reducer";
import {removeOrderIdFromQueue} from "./reducers/remove-order-id-from-queue.reducer";
import {removeOrderIdFromDelivery} from "./reducers/remove-order-id-from-delivery.reducer";

type allQueueActionTypes = addNewItemToDeliveryActionType | removeItemFromDeliveryActionType |
addNewItemToQueueActionType | removeItemFromQueueActionType | addNewKitchenListActionType;

export const queueReducer = (state = initialQueueState, action: allQueueActionTypes) => {

    switch (action.type){
        case QueueActionsEnum.ADD_NEW_ITEM_TO_QUEUE:
            return addNewOrderIdToQueue(action, state);
        
        case QueueActionsEnum.REMOVE_ITEM_QUEUE:
            return removeOrderIdFromQueue(action, state);

        case QueueActionsEnum.ADD_NEW_KITCHEN_LIST:
            const dishes = cloneDeep(action.dishes)
            return {...state, dishesInKitchen: dishes}

        case QueueActionsEnum.ADD_NEW_ITEM_TO_DELIVERY:
            return {...state, itemsInDelivery: [...state.itemsInDelivery, action.item]}
            
        case QueueActionsEnum.REMOVE_ITEM_FROM_DELIVERY:
            return removeOrderIdFromDelivery(action, state);

    }
    return state;
        
}