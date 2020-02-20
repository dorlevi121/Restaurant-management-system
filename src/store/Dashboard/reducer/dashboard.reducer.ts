import {initialDashboardState} from "../dashboard.state";
import * as dashboardActionsTypes from '../dashboard.actions';

export const dashboardReducer = (state = initialDashboardState, action: any) => {
    switch (action.type) {
        case dashboardActionsTypes.ADD_ORDER_TO_QUEUE:
            let newArray = initialDashboardState.ordersInQueue.slice();
            newArray.splice(initialDashboardState.ordersInQueue.length, 0, action.newOrder);
            return {
        ...initialDashboardState,
                ordersInQueue: newArray
            }
    }
    return state;
};

