import {OrderInterface} from "../../../../models/system/order.model";
import {UserType} from "../../../../models/system/user-type.enum";


//Sort
export const QueueToKitchen = (ordersInKitchen: OrderInterface[]): OrderInterface[] => {
    const vipOrders: OrderInterface [] = [];
    const membersOrders: OrderInterface [] = [];
    const regularOrders: OrderInterface [] = []
    for (let i = 0; i < ordersInKitchen.length; i++) {
        if (ordersInKitchen[i].userType ===  UserType.vip)
            vipOrders.push(ordersInKitchen[i]);
        else if (ordersInKitchen[i].userType === UserType.member)
            membersOrders.push(ordersInKitchen[i]);
        else regularOrders.push(ordersInKitchen[i]);
    }
    return vipOrders.concat(membersOrders.concat(regularOrders));
}