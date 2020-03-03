import _, {cloneDeep} from "lodash";
import {DishInterface} from "../../../models/system/dish.model";
import {queueListener} from "../../../manager/orders.manager";
import {addNewOrderToQueueActionType, OrderState} from "../order.types";
import {OrderInterface} from "../../../models/system/order.model";


export const addNewOrder = (action: addNewOrderToQueueActionType, state: OrderState) => {
    const id = _.uniqueId();
    let totalTime = 0, price = 0;
    for (let i = 0; i<action.dishes.length; i++) {
        totalTime += action.dishes[i].duration;
        price += action.dishes[i].price;
        action.dishes[i].orderId = id;
    }
    const newOrder: OrderInterface = {
        dish: action.dishes,
        id: id,
        price: price,
        totalTime: totalTime,
        userType: action.userType
    }
    const newDictionary = cloneDeep(state.allOrders);
    newDictionary[newOrder.id] = newOrder;

    const a: DishInterface[] = [...newOrder.dish];
    const item = {orderId: newOrder.id, userType: newOrder.userType, dishes: [...a], numOfReadyDishes: 0};

    queueListener.addNewOrderToPend(item);
    return { ...state, allOrders: newDictionary, ordersNumber: state.ordersNumber + 1 };
}