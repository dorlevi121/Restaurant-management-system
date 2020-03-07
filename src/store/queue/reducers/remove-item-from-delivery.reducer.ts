import { QueueState, removeItemFromDeliveryActionType} from "../queue.types";

export const removeItemFromDelivery = (action:removeItemFromDeliveryActionType, state: QueueState) => {
    const items = [...state.itemsInDelivery];
    for(let i=0; i<items.length; i++){
        if(items[i].orderId === action.item.orderId){
            items.splice(i,1);
            break;
        }
    }
    return {...state,  itemsInDelivery: items }
}