import {initialOrderState} from "../order.state";
import {OrderActionsEnum} from "../order.actions";
import {
    addNewOrderToQueueActionType,
    addOrderCancelActionType,
    addOrderToHistoryActionType,
    changeStatusActionType,
    removeOrderFromQueueActionType
} from "../order.types";
import {OrderStatus} from "../../../models/system/order-status.model";
import {cloneDeep} from "lodash";

//All types actions
type allOrdersActionTypes = addNewOrderToQueueActionType | removeOrderFromQueueActionType | changeStatusActionType |
    addOrderToHistoryActionType | addOrderCancelActionType;

export const ordersReducer = (state = initialOrderState, action: allOrdersActionTypes) => {
    switch (action.type) {
        case OrderActionsEnum.ADD_NEW_ORDER_TO_QUEUE:
            const newDictionary = cloneDeep(state.allOrders);
            newDictionary[action.newOrder.id] = action.newOrder;
            return { ...state, allOrders: newDictionary, ordersNumber: state.ordersNumber + 1,
                lastOrder: action.newOrder };

        case OrderActionsEnum.REMOVE_ORDER_FROM_QUEUE:
            const myDictionary = cloneDeep(state.allOrders);
            const orderRemove = myDictionary[action.orderId];
            if(orderRemove.status !== OrderStatus.delivery) return {...state}
            delete myDictionary[action.orderId];
            return { ...state, allOrders: myDictionary};

        case OrderActionsEnum.ADD_NEW_ORDER_TO_HISTORY:
            return { ...state, ordersHistory: state.ordersHistory[action.newOrder.id] = action.newOrder };

        case OrderActionsEnum.CHANGE_STATUS:
            const order = state.allOrders[action.orderId]
            if (order !== undefined) {
                if (action.status === OrderStatus.kitchen) order.status = OrderStatus.kitchen
                else if (action.status === OrderStatus.delivery) order.status = OrderStatus.delivery
            }
            return { ...state };

        case OrderActionsEnum.ORDER_CANCEL:
            const Dictionary = cloneDeep(state.allOrders);
            const orderCancel = cloneDeep(Dictionary[action.orderId])
            if(orderCancel.status !== OrderStatus.queue) return {...state}
            delete Dictionary[action.orderId];
            return { ...state, allOrders: Dictionary, orderCancel: orderCancel};


    }

    return state;
}