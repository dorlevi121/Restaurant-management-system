import {initialDashboardState} from "./dashboard.state";
import {
    dashboardActionAddOrderToKitchen,
    dashboardActionOrdersPriority,
    dashboardActionRemoveOrderFromKitchen
} from "./dashboard.types";
import {DashboardActionTypes} from "./dashboard.actions";
import * as reducerDashboardHelper from './reducer/dashboard.reducer-helper';

type allDashboardActions =
    dashboardActionAddOrderToKitchen
    | dashboardActionOrdersPriority
    | dashboardActionRemoveOrderFromKitchen;

export const dashboardReducer = (state = initialDashboardState, action: allDashboardActions) => {
    switch (action.type) {
        case DashboardActionTypes.ADD_ORDER_TO_KITCHEN:
            return reducerDashboardHelper.addNewOrderToKitchen(state, action.newOrder);

        case DashboardActionTypes.REMOVE_ORDER_FROM_KITCHEN:
            return reducerDashboardHelper.removeOrderFromKitchen(state, action.orderToRemove);

        case DashboardActionTypes.PRIORITY_ORDERS_KITCHEN:
            return reducerDashboardHelper.addOrdersPriority(state, action.ordersPriority);
    }
    return state;
};

