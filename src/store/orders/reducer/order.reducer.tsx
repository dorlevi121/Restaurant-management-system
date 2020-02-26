import {initialOrderState} from "../order.state";
import {OrderActionsEnum} from "../order.actions";
import {
    addNewOrderToQueueActionType,
    addOrderToDeliveryActionType,
    addOrderToHistoryActionType,
    addOrderToKitchenActionType,
    changeStatusActionType,
    removeOrderFromDeliveryActionType,
    removeOrderFromKitchenActionType,
    removeOrderFromQueueActionType
} from "../order.types";
import {buildPriorityList} from "../order.build-priority";
import {OrderStatus} from "../../../models/system/order-status.model";

//All types actions
type allOrdersActionTypes = addNewOrderToQueueActionType | removeOrderFromQueueActionType |
    addOrderToKitchenActionType | removeOrderFromKitchenActionType | changeStatusActionType |
    addOrderToDeliveryActionType | removeOrderFromDeliveryActionType | addOrderToHistoryActionType;

export const ordersReducer = (state = initialOrderState, action: allOrdersActionTypes) => {
    switch (action.type) {
        case OrderActionsEnum.ADD_NEW_ORDER_TO_QUEUE:
            const newDictionary = {...state.allOrders};
            newDictionary[action.newOrder.id] = action.newOrder;
            return {
                ...state, allOrders: newDictionary, ordersNumber: state.ordersNumber + 1,
                ordersPriority: [...buildPriorityList(newDictionary)]
            };

        case OrderActionsEnum.REMOVE_ORDER_FROM_QUEUE:
            const idRemove: number = action.removeOrder.id
            return {...state, allOrders: delete state.allOrders[idRemove]};

        case OrderActionsEnum.ADD_ORDER_TO_KITCHEN:
            return {...state, ordersInKitchen: [...state.ordersInKitchen, action.newOrder]};

        case OrderActionsEnum.REMOVE_ORDER_FROM_KITCHEN:
            return {
                ...state,
                ordersInKitchen: [...state.ordersInKitchen.filter((order) => order.id != action.removeOrder.id)]
            };

        case OrderActionsEnum.ADD_ORDER_TO_DELIVERY:
            return {...state, ordersInDelivery: [...state.ordersInDelivery, action.newOrder]};

        case OrderActionsEnum.REMOVE_ORDER_FROM_DELIVERY:
            return {
                ...state,
                ordersInDelivery: [...state.ordersInDelivery.filter((order) => order.id != action.removeOrder.id)]
            };

        case OrderActionsEnum.ADD_NEW_ORDER_TO_HISTORY:
            return {...state, ordersHistory: state.ordersHistory[action.newOrder.id] = action.newOrder};

        case OrderActionsEnum.CHANGE_STATUS:
            const order = state.ordersPriority.find(order => action.order.id === order.id);
            if (order !== undefined) order.status = OrderStatus.kitchen
            return {...state}
    }


    return state;
}
