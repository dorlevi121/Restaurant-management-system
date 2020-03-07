import {QueueState, removeItemFromQueueActionType} from "../queue.types";
import {cloneDeep} from "lodash";


export const removeItemFromQueue = (action: removeItemFromQueueActionType, state: QueueState) => {
    const items = cloneDeep(state.itemsInQueue);
    for(let i=0; i<items.length; i++){
        if(items[i].orderId === action.item.orderId){
            items.splice(i,1);
            break;
        }
    }
    return {...state, itemsInQueue: items }
}