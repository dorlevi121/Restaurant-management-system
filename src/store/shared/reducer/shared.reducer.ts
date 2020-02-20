import {SharedActionTypes} from '../shared.actions';
import {sharedActionAddOrder} from "../shared.types";
import {initialSharedState} from "../shared.state";
import * as reducerHelper from "../shared.reducer-helper";

type allDashboardActions = sharedActionAddOrder;

export const sharedReducer = (state = initialSharedState, action: allDashboardActions) => {

    switch (action.type) {
        case SharedActionTypes.ADD_ORDER_TO_QUEUE:
            return reducerHelper.addNewOrderToQueue(state, action.newOrder)
    }
    return state;
};

