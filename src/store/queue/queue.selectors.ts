import {DishInterface} from "../../models/system/dish.model";
import {ItemInterface} from "../../models/system/item.model";

export const getItemsInQueue = (state: any): ItemInterface[] => state.queue.itemsInQueue;
export const getDishesInKitchen = (state: any): DishInterface[] => state.queue.dishesInKitchen;
export const getItemsInDelivery = (state: any): ItemInterface[] => state.queue.itemsInDelivery;
