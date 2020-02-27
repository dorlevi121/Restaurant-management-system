import {OrderState} from "./order.types";

export const initialOrderState: OrderState = {
    allOrders: {},
    ordersPriority: [],
    ordersHistory: {},
    ordersNumber: 0,
    lastOrder: null
}