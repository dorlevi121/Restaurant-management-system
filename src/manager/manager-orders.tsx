import {EventEmitter} from 'events';
import {numberOfCookingStands, numberOfMessengers, deliveryTime} from "../config/config";
import {EventManager} from "./event.manager";
import {buildPriorityList} from "../store/orders/order.build-priority";
import {cloneDeep, isEqual} from 'lodash';
import { ItemType } from '../models/system/item.modal';
import { DishType } from '../models/system/dish.model';


class QueueListener extends EventEmitter {
    private items: ItemType[]; //Hold sorted items
    private dishesWaitingToKitchen: DishType[]; // myOrder - Location relative to other dishes value- Number of dishes in the order
    private dishesInKitchen: DishType []; //Hold items in kitchen
    private itemsInKitchen: ItemType[];
    private itemsWaitingToDelivery: ItemType [];
    private itemsInDelivery: ItemType[]; // Hold items in delivery

    constructor() {
        super();
        this.items = [];
        this.dishesWaitingToKitchen = [];
        this.dishesInKitchen = [];
        this.itemsInKitchen = [];
        this.itemsInDelivery = [];
        this.itemsWaitingToDelivery = [];
    }

    addNewOrderToPend = (item: ItemType) => {
        this.items = cloneDeep(buildPriorityList(this.items, item));
        if (this.dishesInKitchen.length < numberOfCookingStands)
            this.pushDishesToKitchen();
        else {
            this.emit(EventManager.ADD_NEW_ITEM_TO_QUEUE, item.orderId, this.items.findIndex(i=>i.orderId===item.orderId))
        };
    }

    pushDishesToKitchen = () => {
        const orderToKitchen = this.items.shift();
        if (orderToKitchen === undefined) return;

        this.itemsInKitchen.push(orderToKitchen)
        this.emit(EventManager.REMOVE_ITEM_FROM_QUEUE, orderToKitchen.orderId);

        for (let i = 0; i < orderToKitchen.dishes.length; i++)
            this.dishesWaitingToKitchen.push(orderToKitchen.dishes[i])

        while (this.dishesInKitchen.length < numberOfCookingStands) {
            const dishToKitchen = this.dishesWaitingToKitchen.shift();
            if (dishToKitchen !== undefined) this.addToKitchen(dishToKitchen);
            else return;
        }

    }


    addToKitchen(dish: DishType) {
        this.dishesInKitchen.push(dish);
        this.emit(EventManager.UPDATE_NEW_KITCHEN_LIST, this.dishesInKitchen);
        let timer = dish.duration, minutes, seconds;
        const kitchenInterval = setInterval(() => {
            minutes = parseInt(String(timer / 60), 10);
            seconds = parseInt(String(timer % 60), 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            console.log(minutes + ":" + seconds + ' ( order number :' + dish.orderId  + ') | ');
            if (--timer < 0) {
                clearInterval(kitchenInterval);

                this.removeDishFromKitchen(dish);
                this.emit(EventManager.UPDATE_NEW_KITCHEN_LIST, this.dishesInKitchen);

                const orderId = dish.orderId
                const found = this.itemsInKitchen.find(item => item.orderId === orderId);
                
                if(found===undefined) return;
                found.numOfReadyDishes = found.numOfReadyDishes+1;

                if (found.dishes.length === found.numOfReadyDishes) {
                    this.itemsInKitchen.splice(this.itemsInKitchen.indexOf(found), 1);
                    this.itemsWaitingToDelivery.push(found);

                    if (this.itemsInDelivery.length < numberOfMessengers) {
                        const nextDelivery = this.itemsWaitingToDelivery.shift();
                        if (nextDelivery !== undefined) this.addToDelivery(nextDelivery)
                    }
                }

                if (this.dishesWaitingToKitchen.length !== 0) {
                    const dishToKitchen = this.dishesWaitingToKitchen.shift();
                    if (dishToKitchen !== undefined) this.addToKitchen(dishToKitchen);
                } 
                else this.pushDishesToKitchen();
            }
        }, 1000);
    }


    addToDelivery = (item: ItemType): void => {
        this.itemsInDelivery.push(item)
        this.emit(EventManager.ADD_NEW_ITEM_TO_DELIVERY,item.orderId);

        let time = deliveryTime;//second
        let minutes, seconds;

        const deliveryInterval = setInterval(() => {
            minutes = parseInt(String(time / 60), 10);
            seconds = parseInt(String(time % 60), 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            console.log(minutes + ":" + seconds + ' (' + item.orderId + ')');
            if (--time < 0) {
                clearInterval(deliveryInterval);

                this.removeOrderFromDelivery(item.orderId);
                this.emit(EventManager.REMOVE_ITEM_FROM_DELIVERY, item.orderId);

                if (this.itemsWaitingToDelivery.length !== 0) {
                    const nextDelivery = this.itemsWaitingToDelivery.pop();
                    if (nextDelivery !== undefined) this.addToDelivery(nextDelivery)
                }
            }
        }, 1000)
    }


    removeDishFromKitchen = (dish: DishType) => {
        for (let i = 0; i < this.dishesInKitchen.length; i++) {
            if (isEqual(this.dishesInKitchen[i], dish))
                this.dishesInKitchen.splice(i, 1);
        }
    }


    removeOrderFromDelivery = (orderId: number) => {
        for (let i = 0; i < this.itemsInDelivery.length; i++) {
            if (this.itemsInDelivery[i].orderId === orderId)
                this.itemsInDelivery.splice(i, 1);
        }
    }

    removeOrder = (orderId: number) => {
        for (let i=0; i<this.items.length; i++){
            if(this.items[i].orderId === orderId)
                delete this.items[i];
        }
    }
}

export const queueListener = new QueueListener();
