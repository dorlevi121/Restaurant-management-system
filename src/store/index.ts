import {ordersReducer} from './orders/reducer/order.reducer';
import {combineReducers} from "redux";
import {storageReducer} from "./storage/reducer/storage.reducer";

export const rootReducer = combineReducers({
    orders: ordersReducer,
    storage: storageReducer
})

