import {initialOrderState} from "./order.state";
import {
    addNewOrderToQueueActionType,
    addOrderCancelActionType, OrderActionsEnum,
    removeOrderFromQueueActionType
} from "./order.types";
import {addNewOrder} from "./reducers/add-new-order.reducer";
import {removeOrder} from "./reducers/remove-order.reducer";
import {cancelOrder} from "./reducers/cancel-order.reducer";


//All types actions
type allOrdersActionTypes = addNewOrderToQueueActionType | removeOrderFromQueueActionType | addOrderCancelActionType;

export const ordersReducer = (state = initialOrderState, action: allOrdersActionTypes) => {
    switch (action.type) {
        case OrderActionsEnum.ADD_NEW_ORDER_TO_QUEUE:
          return addNewOrder(action, state);

        case OrderActionsEnum.REMOVE_ORDER_FROM_QUEUE:
            return removeOrder(action, state);

        case OrderActionsEnum.ORDER_CANCEL:
            return cancelOrder(action, state);
    }

    return state;
}