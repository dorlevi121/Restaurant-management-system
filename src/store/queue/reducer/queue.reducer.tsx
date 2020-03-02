import { initialQueueState } from "../queue.state";
import { addNewItemToDeliveryActionType, removeItemFromDeliveryActionType, addNewItemToQueueActionType, removeItemFromQueueActionType, addNewKitchenListActionType } from "../queue.types";
import { QueueActionsEnum } from "../queue.actions";
import { cloneDeep } from "lodash";

type allQueueActionTypes = addNewItemToDeliveryActionType | removeItemFromDeliveryActionType |
addNewItemToQueueActionType | removeItemFromQueueActionType | addNewKitchenListActionType;

export const queueReducer = (state = initialQueueState, action: allQueueActionTypes) => {

    switch (action.type){
        case QueueActionsEnum.ADD_NEW_ITEM_TO_QUEUE:
            const items = [...state.OrdersIdInQueue];
            items.splice(action.index, 0, action.OrderId);              
            return {...state, OrdersIdInQueue: items}
        
        case QueueActionsEnum.REMOVE_ITEM_FROM_QUEUE:
            var allitems = cloneDeep(state.OrdersIdInQueue);
            for(let i=0; i<allitems.length; i++){
                if(allitems[i] === action.OrderId){
                    allitems.splice(i,1);
                    break;
                }
            }
            return {...state, OrdersIdInQueue: allitems }

        case QueueActionsEnum.ADD_NEW_KITCHEN_LIST:
            const dishes = cloneDeep(action.dishes)
            return {...state, dishesInKitchen: dishes}

        case QueueActionsEnum.ADD_NEW_ITEM_TO_DELIVERY:
            return {...state, OrdersIdInDelivery: [...state.OrdersIdInDelivery, action.OrderId]}
            
        case QueueActionsEnum.REMOVE_ITEM_FROM_QUEUE:
            const citems = [...state.OrdersIdInDelivery];
            for(let i=0; i<citems.length; i++){
                if(citems[i] === action.OrderId){
                    citems.splice(i,1);
                    break;
                }
            }
            return {...state, OrdersIdInDelivery: citems }

    }
    return state;
        
}