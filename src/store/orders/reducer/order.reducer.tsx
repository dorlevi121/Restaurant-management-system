import {initialOrderState} from "../order.state";
import {OrderActionsEnum} from "../order.actions";
import {
    addNewOrderToQueueActionType,
    addOrderToHistoryActionType,
    changeStatusActionType,
    removeOrderFromPriorityActionType,
    removeOrderFromQueueActionType
} from "../order.types";
import {buildPriorityList} from "../order.build-priority";
import {OrderStatus} from "../../../models/system/order-status.model";
import {OrderType} from "../../../models/system/order.model";

//All types actions
type allOrdersActionTypes = addNewOrderToQueueActionType | removeOrderFromQueueActionType | changeStatusActionType |
    removeOrderFromPriorityActionType | addOrderToHistoryActionType;

export const ordersReducer = (state = initialOrderState, action: allOrdersActionTypes) => {
    switch (action.type) {
        case OrderActionsEnum.ADD_NEW_ORDER_TO_QUEUE:
            const newDictionary = {...state.allOrders};
            newDictionary[action.newOrder.id] = action.newOrder;
            return {
                ...state, allOrders: newDictionary, ordersNumber: state.ordersNumber + 1,
                ordersPriority: [...buildPriorityList(newDictionary)], lastOrder: action.newOrder
            };

        case OrderActionsEnum.REMOVE_ORDER_FROM_QUEUE:
            const idRemove: number = action.removeOrder.id
            return {...state, allOrders: delete state.allOrders[idRemove]};

        case OrderActionsEnum.ADD_NEW_ORDER_TO_HISTORY:
            return {...state, ordersHistory: state.ordersHistory[action.newOrder.id] = action.newOrder};

        case OrderActionsEnum.CHANGE_STATUS:
            const order = state.ordersPriority.find((order: OrderType) => action.order.id === order.id);
            if (order !== undefined) {
                if (action.status === OrderStatus.kitchen) order.status = OrderStatus.kitchen
                else if (action.status === OrderStatus.delivery) order.status = OrderStatus.delivery
            }
            return {...state};

        case OrderActionsEnum.REMOVE_ORDER_FROM_PRIORITY:
            return {
                ...state,
                ordersPriority: [...state.ordersPriority.filter((order) => order.id != action.removeOrder.id)]
            };
    }


    return state;
}
