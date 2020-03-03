import { initialQueueState } from "./queue.state";
import {
    addNewOrderIdToDeliveryActionType,
    removeOrderIdFromDeliveryActionType,
    addNewOrderIdToQueueActionType,
    removeOrderIdFromQueueActionType,
    addNewKitchenListActionType,
    QueueActionsEnum
} from "./queue.types";
import { cloneDeep } from "lodash";
import {addNewOrderIdToQueue} from "./reducers/add-new-order-id-to-queue.reducer";
import {removeOrderIdFromQueue} from "./reducers/remove-order-id-from-queue.reducer";
import {removeOrderIdFromDelivery} from "./reducers/remove-order-id-from-delivery.reducer";

type allQueueActionTypes = addNewOrderIdToDeliveryActionType | removeOrderIdFromDeliveryActionType |
addNewOrderIdToQueueActionType | removeOrderIdFromQueueActionType | addNewKitchenListActionType;

export const queueReducer = (state = initialQueueState, action: allQueueActionTypes) => {

    switch (action.type){
        case QueueActionsEnum.ADD_NEW_ORDER_ID_TO_QUEUE:
            return addNewOrderIdToQueue(action, state);
        
        case QueueActionsEnum.REMOVE_ORDER_ID_QUEUE:
            return removeOrderIdFromQueue(action, state);

        case QueueActionsEnum.ADD_NEW_KITCHEN_LIST:
            const dishes = cloneDeep(action.dishes)
            return {...state, dishesInKitchen: dishes}

        case QueueActionsEnum.ADD_NEW_ORDER_ID_TO_DELIVERY:
            return {...state, OrdersIdInDelivery: [...state.OrdersIdInDelivery, action.OrderId]}
            
        case QueueActionsEnum.REMOVE_ORDER_ID_FROM_DELIVERY:
            return removeOrderIdFromDelivery(action, state);

    }
    return state;
        
}