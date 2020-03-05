import {ordersReducer} from './orders/order.reducer';
import {combineReducers} from "redux";
import {storageReducers} from "./storage/storage.reducers";
import { queueReducer } from './queue/queue.reducer';

export const rootReducer = combineReducers({
    orders: ordersReducer,
    storage: storageReducers,
    queue: queueReducer
})

