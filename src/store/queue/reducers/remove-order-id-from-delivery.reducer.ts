import { QueueState, removeItemFromDeliveryActionType} from "../queue.types";

export const removeOrderIdFromDelivery = (action:removeItemFromDeliveryActionType, state: QueueState) => {
    const items = [...state.itemsInDelivery];
    for(let i=0; i<items.length; i++){
        if(items[i] === action.item){
            items.splice(i,1);
            break;
        }
    }
    return {...state,  itemsInDelivery: items }
}