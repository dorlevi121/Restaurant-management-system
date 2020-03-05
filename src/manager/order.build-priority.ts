import {UserType} from "../models/system/user-type.enum";
import { ItemInterface } from "../models/system/item.model";


export const buildPriorityList = (orders: ItemInterface[], newOrder: ItemInterface): ItemInterface[] => {
    orders.push(newOrder)
    const vipOrders: ItemInterface [] = [];
    const membersOrders: ItemInterface [] = [];
    const regularOrders: ItemInterface [] = []
    for (let i=0; i<orders.length; i++) {
        if(orders[i].userType === UserType.member) membersOrders.push(orders[i]);
        else if(orders[i].userType === UserType.vip) vipOrders.push(orders[i]);
        else regularOrders.push(orders[i]);
    }
    return vipOrders.concat(membersOrders.concat(regularOrders));
}