import {addNewOrderIdToQueueActionType, QueueState} from "../queue.types";


export const addNewOrderIdToQueue = (action: addNewOrderIdToQueueActionType , state: QueueState) => {
    const items = [...state.OrdersIdInQueue];
    items.splice(action.index, 0, action.OrderId);
    return {...state, OrdersIdInQueue: items}
}