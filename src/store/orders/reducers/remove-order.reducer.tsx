import {OrderState, removeOrderFromQueueActionType} from "../order.types";
import {cloneDeep} from "lodash";
import {queueListener} from "../../../manager/orders.manager";


export const removeOrder = (action: removeOrderFromQueueActionType, state: OrderState) => {
    const myDictionary = cloneDeep(state.allOrders);
    const orderRemove = myDictionary[action.orderId];
    queueListener.removeOrder(orderRemove.id);

    delete myDictionary[action.orderId];


    return { ...state, allOrders: myDictionary};
}