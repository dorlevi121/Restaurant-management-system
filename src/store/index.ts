import { dashboardReducer} from "./Dashboard/dashboard.reducer";
import {orderReducer} from './Order/reducer/order.reducer';
import {combineReducers} from "redux";
import {sharedReducer} from "./shared/reducer/shared.reducer";

export const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    shared: sharedReducer
})

