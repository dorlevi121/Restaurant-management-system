import {DishInterface} from "../../models/system/dish.model";

export const getOrdersIdInQueue = (state: any): string[] => state.queue.OrdersIdInQueue;
export const getDishesInKitchen = (state: any): DishInterface[] => state.queue.dishesInKitchen;
export const getOrdersIdInDelivery = (state: any): string[] => state.queue.OrdersIdInDelivery;