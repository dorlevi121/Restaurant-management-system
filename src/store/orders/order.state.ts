import {OrderState} from "./order.types";

export const initialOrderState: OrderState = {
    allOrders: {},
    ordersNumber: 0,
    lastOrder: null,
    orderCancel: null
}