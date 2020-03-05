import {addNewItemToQueueActionType, QueueState} from "../queue.types";


export const addNewOrderIdToQueue = (action: addNewItemToQueueActionType , state: QueueState) => {
    const items = [...state.itemsInQueue];
    items.splice(action.index, 0, action.item);
    return {...state, itemsInQueue: items}
}