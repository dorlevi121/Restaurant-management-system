import {addOrderCancelActionType, OrderState} from "../order.types";
import {cloneDeep} from "lodash";
import {queueListener} from "../../../manager/orders.manager";


export const cancelOrder = (action:addOrderCancelActionType, state: OrderState) => {
    const Dictionary = cloneDeep(state.allOrders);
    const orderCancel = cloneDeep(Dictionary[action.orderId])
    delete Dictionary[action.orderId];
    queueListener.removeOrder(orderCancel.id);
    return { ...state, allOrders: Dictionary }
}