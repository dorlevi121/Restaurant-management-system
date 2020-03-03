import {QueueState, removeOrderIdFromQueueActionType} from "../queue.types";
import {cloneDeep} from "lodash";


export const removeOrderIdFromQueue = (action: removeOrderIdFromQueueActionType, state: QueueState) => {
    const items = cloneDeep(state.OrdersIdInQueue);
    for(let i=0; i<items.length; i++){
        if(items[i] === action.OrderId){
            items.splice(i,1);
            break;
        }
    }
    return {...state, OrdersIdInQueue: items }
}