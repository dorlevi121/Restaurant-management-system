import {UserType} from "../../models/system/user-type.model";
import { ItemType } from "../../models/system/item.modal";


export const buildPriorityList = (orders: ItemType[], newOrder: ItemType): ItemType[] => {
    orders.push(newOrder)
    const vipOrders: ItemType [] = [];
    const membersOrders: ItemType [] = [];
    const regularOrders: ItemType [] = []
    for (let i=0; i<orders.length; i++) {
        if(orders[i].userType === UserType.member) membersOrders.push(orders[i]);
        else if(orders[i].userType === UserType.vip) vipOrders.push(orders[i]);
        else regularOrders.push(orders[i]);
    }
    return vipOrders.concat(membersOrders.concat(regularOrders));
}