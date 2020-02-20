import {initialDashboardState} from "../dashboard.state";
import {dashboardAction} from "../dashboard.types";

type allDashboardActions = dashboardAction;

export const dashboardReducer = (state = initialDashboardState, action: allDashboardActions) => {


    return state;
};

