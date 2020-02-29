
import {OrderType} from "../../models/system/order.model";
import {UserType} from "../../models/system/user-type.model";


export const buildPriorityList = (orders:{[id:number]: OrderType}) => {
    const vipOrders: OrderType [] = [];
    const membersOrders: OrderType [] = [];
    const regularOrders: OrderType [] = []
    for (let key in orders) {
        if(orders[key].userType === UserType.member) membersOrders.push(orders[key]);
        else if(orders[key].userType === UserType.vip) vipOrders.push(orders[key]);
        else regularOrders.push(orders[key]);
    }
    return vipOrders.concat(membersOrders.concat(regularOrders));
}