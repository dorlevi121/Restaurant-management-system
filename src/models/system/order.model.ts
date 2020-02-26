import {DishType} from "./dish.model";
import {UserType} from "./user-type.model";
import {OrderStatus} from "./order-status.model";

export type OrderType = {
    id: number,
    userType: UserType,
    dish: DishType [],
    totalTime: number,
    price: number,
    status: OrderStatus
}