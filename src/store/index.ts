import { dashboardReducer} from "./Dashboard/reducer/dashboard.reducer";
import {orderReducer} from './Order/reducer/order.reducer';
import {combineReducers} from "redux";

export const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    order: orderReducer
})

