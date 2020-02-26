import {OrderState} from "../../../../store/orders/order.types";
import {OrderType} from "../../../../models/system/order.model";
import {UserType} from "../../../../models/system/user-type.model";


//Sort
export const QueueToKitchen = (ordersInKitchen: OrderType[]): OrderType[] => {
    const vipOrders: OrderType [] = [];
    const membersOrders: OrderType [] = [];
    const regularOrders: OrderType [] = []
    for (let i = 0; i < ordersInKitchen.length; i++) {
        if (ordersInKitchen[i].userType ===  UserType.vip)
            vipOrders.push(ordersInKitchen[i]);
        else if (ordersInKitchen[i].userType === UserType.member)
            membersOrders.push(ordersInKitchen[i]);
        else regularOrders.push(ordersInKitchen[i]);
    }
    return vipOrders.concat(membersOrders.concat(regularOrders));
}