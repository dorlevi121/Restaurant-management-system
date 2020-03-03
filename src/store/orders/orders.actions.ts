import {Dispatch} from "redux";
import {OrderInterface} from "../../models/system/order.model";
import {OrderActionsEnum} from "./order.types";
import {DishInterface} from "../../models/system/dish.model";
import {UserType} from "../../models/system/user-type.enum";

export const addNewOrderToQueue = (dishes: DishInterface[], userType: UserType) => {
    return {type: OrderActionsEnum.ADD_NEW_ORDER_TO_QUEUE,  dishes: dishes, userType: userType}
};

export const removeOrderFromQueue = (orderId: string) => {
    return {type: OrderActionsEnum.REMOVE_ORDER_FROM_QUEUE, orderId: orderId}
};

export const addNewOrderToCancel = (orderId: string) => {
    return {type: OrderActionsEnum.ORDER_CANCEL, orderId: orderId};
}