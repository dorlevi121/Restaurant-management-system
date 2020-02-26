import {OrderState} from "./order.types";
import {OrderType} from "../../models/system/order.model";
import {numberOfCookingStands} from "../../config/config";

export const initialOrderState: OrderState = {
    allOrders: {},
    ordersPriority: [],
    ordersInKitchen: new Array(numberOfCookingStands),
    ordersInDelivery: new Array(2),
    ordersHistory: {},
    ordersNumber: 0
}