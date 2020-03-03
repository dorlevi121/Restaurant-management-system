import { QueueState, removeOrderIdFromDeliveryActionType} from "../queue.types";

export const removeOrderIdFromDelivery = (action:removeOrderIdFromDeliveryActionType, state: QueueState) => {
    const items = [...state.OrdersIdInDelivery];
    for(let i=0; i<items.length; i++){
        if(items[i] === action.OrderId){
            items.splice(i,1);
            break;
        }
    }
    return {...state, OrdersIdInDelivery: items }
}