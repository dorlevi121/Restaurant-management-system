import { EventEmitter } from 'events';
import { deliveryTime, numberOfCookingStands, numberOfMessengers } from "../config/config";
import { OrdersEvents } from "./orders-events";
import { buildPriorityList } from "./order.build-priority";
import { cloneDeep, isEqual } from 'lodash';
import { ItemInterface } from '../models/system/item.model';
import { DishInterface } from '../models/system/dish.model';


class QueueListener extends EventEmitter {
    private items: ItemInterface[]; //Hold sorted items
    private dishesPendingToKitchen: DishInterface[]; // myOrder - Location relative to other dishes value- Number of dishes in the order
    private dishesInKitchen: DishInterface[]; //Hold items in kitchen
    private itemsInKitchen: ItemInterface[];
    private itemsPendingToDelivery: ItemInterface[];
    private itemsInDelivery: ItemInterface[]; // Hold items in delivery

    constructor() {
        super();
        this.items = [];
        this.dishesPendingToKitchen = [];
        this.dishesInKitchen = [];
        this.itemsInKitchen = [];
        this.itemsInDelivery = [];
        this.itemsPendingToDelivery = [];
    }

    addNewOrderToPend = (item: ItemInterface) => {
        this.items = cloneDeep(buildPriorityList(this.items, item));
        if (this.dishesInKitchen.length < numberOfCookingStands)
            this.pushDishesToKitchen();
        else {
            this.emit(OrdersEvents.ADD_NEW_ITEM_TO_QUEUE, item,
                this.items.findIndex(i => i.orderId === item.orderId))
        }
    }


    pushDishesToKitchen = () => {
        const orderToKitchen = this.items.shift();
        if (orderToKitchen === undefined) return;

        this.itemsInKitchen.push(orderToKitchen)
        this.emit(OrdersEvents.REMOVE_ITEM_FROM_QUEUE, orderToKitchen);

        for (let i = 0; i < orderToKitchen.dishes.length; i++) {
            this.dishesPendingToKitchen.push(cloneDeep(orderToKitchen.dishes[i]))
        }

        while (this.dishesInKitchen.length < numberOfCookingStands) {
            const dishToKitchen = cloneDeep(this.dishesPendingToKitchen.shift());
            if (dishToKitchen === undefined) {
                return;
            }
            this.addToKitchen(dishToKitchen);
        }
    }


    addToKitchen(dish: DishInterface) {
        dish.kitchenEntryTime = Date.now();
        this.dishesInKitchen.push(dish);
        this.emit(OrdersEvents.UPDATE_NEW_KITCHEN_LIST, this.dishesInKitchen);
        let timer = dish.duration;
        const kitchenInterval = setInterval(() => {
            if (--timer < 0) {
                clearInterval(kitchenInterval);

                this.removeDishFromKitchen(dish);
                this.emit(OrdersEvents.UPDATE_NEW_KITCHEN_LIST, this.dishesInKitchen);

                const orderId: string = dish.orderId
                const order = this.itemsInKitchen.find(item => item.orderId === orderId); //order of dish

                if (order === undefined) return;
                order.numOfReadyDishes = order.numOfReadyDishes + 1;

                if (order.dishes.length === order.numOfReadyDishes) { //if all the order's dishes are ready
                    this.itemsInKitchen.splice(this.itemsInKitchen.indexOf(order), 1);
                    this.itemsPendingToDelivery.push(order);

                    if (this.itemsInDelivery.length < numberOfMessengers) { //if there is place in delivery
                        const nextDelivery = this.itemsPendingToDelivery.shift();
                        if (nextDelivery !== undefined) this.addToDelivery(nextDelivery)
                    }
                }

                if (this.dishesPendingToKitchen.length !== 0) { //if there is dishes that waiting to kitchen
                    const dishToKitchen = this.dishesPendingToKitchen.shift();
                    if (dishToKitchen === undefined) return;
                    this.addToKitchen(dishToKitchen);
                } else this.pushDishesToKitchen();
            }
        }, 1000);
    }


    addToDelivery = (item: ItemInterface): void => {
        item.deliveryEntryTime = Date.now();
        this.itemsInDelivery.push(item)
        this.emit(OrdersEvents.ADD_NEW_ITEM_TO_DELIVERY, item);

        let time = deliveryTime;//second

        const deliveryInterval = setInterval(() => {
            if (--time < 0) {
                clearInterval(deliveryInterval);
                this.removeOrderFromDelivery(item.orderId);
                this.emit(OrdersEvents.REMOVE_ITEM_FROM_DELIVERY, item);

                if (this.itemsPendingToDelivery.length !== 0) {
                    const nextDelivery = this.itemsPendingToDelivery.pop();
                    if (nextDelivery !== undefined) this.addToDelivery(nextDelivery)
                }
            }
        }, 1000)
    }


    removeDishFromKitchen = (dish: DishInterface) => {
        for (let i = 0; i < this.dishesInKitchen.length; i++) {
            if (isEqual(this.dishesInKitchen[i], dish))
                this.dishesInKitchen.splice(i, 1);
        }
    }


    removeOrderFromDelivery =
        (orderId: string) => {
            for (let i = 0; i < this.itemsInDelivery.length; i++) {
                if (this.itemsInDelivery[i].orderId === orderId)
                    this.itemsInDelivery.splice(i, 1);
            }
        }


    removeOrder = (orderId: string) => {
        let item = null;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].orderId === orderId) {
                item = this.items[i]
                this.items.splice(i, 1);
                break;
            }
        }
        if (item === null) return console.log('sss');
        ;
        this.emit(OrdersEvents.REMOVE_ITEM_FROM_QUEUE, item);

    }


    emit(event: string | symbol, ...args: any[]): boolean {
        setTimeout(() => {
            super.emit(event, ...args);
        }, 0);
        return true;
    }
}

export const queueListener = new QueueListener();
