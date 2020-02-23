import {OrderState} from "../../../../store/Order/order.types";

export const QueueToKitchen = (ordersInKitchen: OrderState[]): OrderState[] => {
    const vipOrders: OrderState [] = [];
    const membersOrders: OrderState [] = [];
    const regularOrders: OrderState [] = []
    for (let i = 0; i < ordersInKitchen.length; i++) {
        if (ordersInKitchen[i].userType === 'VIP')
            vipOrders.push(ordersInKitchen[i]);
        else if (ordersInKitchen[i].userType === 'Member')
            membersOrders.push(ordersInKitchen[i]);
        else regularOrders.push(ordersInKitchen[i]);
    }
    return vipOrders.concat(membersOrders.concat(regularOrders));
}