
import {OrderType} from "../../models/system/order.model";
import {UserType} from "../../models/system/user-type.model";
import {orderItem} from "../../manager/manager-orders";


export const buildPriorityList = (orders: orderItem[], newOrder: orderItem): orderItem[] => {
    orders.push(newOrder)
    const vipOrders: orderItem [] = [];
    const membersOrders: orderItem [] = [];
    const regularOrders: orderItem [] = []
    for (let i=0; i<orders.length; i++) {
        if(orders[i].priority === UserType.member) membersOrders.push(orders[i]);
        else if(orders[i].priority === UserType.vip) vipOrders.push(orders[i]);
        else regularOrders.push(orders[i]);
    }
    return vipOrders.concat(membersOrders.concat(regularOrders));
}