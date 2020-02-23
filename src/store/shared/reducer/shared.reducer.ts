import {SharedActionTypes} from '../shared.actions';
import {sharedActionAddOrder, sharedActionRemoveOrder} from "../shared.types";
import {initialSharedState} from "../shared.state";
import * as reducerSharedHelper from "../shared.reducer-helper";

type allSharedActions = sharedActionAddOrder | sharedActionRemoveOrder;

export const sharedReducer = (state = initialSharedState, action: allSharedActions) => {

    switch (action.type) {
        case SharedActionTypes.ADD_ORDER_TO_QUEUE:
            return reducerSharedHelper.addNewOrderToQueue(state, action.newOrder);
        case SharedActionTypes.REMOVE_ORDER_FROM_QUEUE:
            return reducerSharedHelper.removeOrderFromQueue(state, action.removeOrder)
    }
    return state;
};

