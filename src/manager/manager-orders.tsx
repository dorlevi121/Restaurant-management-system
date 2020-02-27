import {EventEmitter} from 'events';
import {numberOfCookingStands, numberOfMessengers} from "../config/config";
import {OrderStatus} from "../models/system/order-status.model";
import {EventManager} from "./event.manager";

export interface orderItem {
    id: number,
    ttl: number, //seconds
    priority: number, //Array priority location
    dishes: { myOrder: number, myDishes: [number, number] }[]
}

class QueueListener extends EventEmitter {
    private items: orderItem[]; //Hold sorted items
    private itemsWaitingToKitchen: { myOrder: number, myDishes: [number, number] }[]; // myPlace - Location relative to other dishes value- Number of dishes in the order
    dishesInKitchen: { myOrder: number, myDishes: [number, number] }[]; //Hold items in kitchen
    private itemsInKitchen: orderItem[];
    private itemsWaitingToDelivery: orderItem [];
    private itemsInDelivery: orderItem[]; // Hold items in delivery

    constructor() {
        super();
        this.items = [];
        this.itemsWaitingToKitchen = [];
        this.dishesInKitchen = [];
        this.itemsInKitchen = [];
        this.itemsInDelivery = [];
        this.itemsWaitingToDelivery = [];
    }

    addNewOrderToPend = (order: orderItem) => {
        this.items.splice(order.priority, 0, order);
        if (this.dishesInKitchen.length < numberOfCookingStands)
            this.pushDishesToKitchen()
    }


    addToKitchen(dish: { myOrder: number, myDishes: [number, number] }) {
        this.dishesInKitchen.push(dish);
        let timer = 5, minutes, seconds;
        console.log('addToKitchen - 1')
        const kitchenInterval = setInterval(() => {
            minutes = parseInt(String(timer / 60), 10);
            seconds = parseInt(String(timer % 60), 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            console.log(minutes + ":" + seconds + ' (' + 'order number :' + dish.myOrder + ' | ' + dish.myDishes + ')');
            if (--timer < 0) {
                clearInterval(kitchenInterval);
                this.removeOrderFromKitchen(dish);
                if (dish.myDishes[0] === dish.myDishes[1]) {
                    const order = this.itemsInKitchen.find(o => o.id === dish.myOrder);
                    if (order === undefined) return;
                    this.itemsWaitingToDelivery.push(order);
                    this.emit(EventManager.UPDATE_ORDER_STATUS, order.id, OrderStatus.waiting_to_delivery);
                }
                if (this.itemsInDelivery.length < numberOfMessengers) {
                    const nextDelivery = this.itemsWaitingToDelivery.pop();
                    if (nextDelivery !== undefined) this.addToDelivery(nextDelivery)
                }
                if (this.itemsWaitingToKitchen.length !== 0) {
                    const dishToKitchen = this.itemsWaitingToKitchen.shift();
                    if (dishToKitchen !== undefined) this.addToKitchen(dishToKitchen);
                } else this.pushDishesToKitchen();
            }
        }, 1000);
    }


    addToDelivery = (data: orderItem): void => {
        this.itemsInDelivery.push(data)
        this.emit(EventManager.UPDATE_ORDER_STATUS, data.id, OrderStatus.delivery);
        let deliveryTime = 20;//second
        let minutes, seconds;

        const deliveryInterval = setInterval(() => {
            minutes = parseInt(String(deliveryTime / 60), 10);
            seconds = parseInt(String(deliveryTime % 60), 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            console.log(minutes + ":" + seconds + ' (' + data.id + ')');
            if (--deliveryTime < 0) {
                clearInterval(deliveryInterval);
                this.removeOrderFromDelivery(data.id)
                this.emit(EventManager.ORDER_FINISHED, data.id);
                if (this.itemsWaitingToDelivery.length !== 0) {
                    const nextDelivery = this.itemsWaitingToDelivery.pop();
                    if (nextDelivery !== undefined) this.addToDelivery(nextDelivery)
                }
            }
        }, 1000)
    }

    destroy() {
        this.removeAllListeners();
        //todo: clearInterval
    }

    removeOrderFromKitchen = (dish: { myOrder: number, myDishes: { [myPlace: number]: number } }) => {
        for (let i = 0; i < this.dishesInKitchen.length; i++) {
            if (this.dishesInKitchen[i] === dish)
                this.dishesInKitchen.splice(i, 1);
        }
    }

    removeOrderFromOrders = (orderId: number) => {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === orderId)
                this.items.splice(i, 1);
        }
    }

    removeOrderFromDelivery = (orderId: number) => {
        for (let i = 0; i < this.itemsInDelivery.length; i++) {
            if (this.itemsInDelivery[i].id === orderId)
                this.itemsInDelivery.splice(i, 1);
        }
    }

    pushDishesToKitchen = () => {
        const orderToKitchen = this.items.shift();
        if (orderToKitchen === undefined) return;
        this.itemsInKitchen.push(orderToKitchen)
        for (let i = 0; i < orderToKitchen.dishes.length; i++)
            this.itemsWaitingToKitchen.push(orderToKitchen.dishes[i])
        this.emit(EventManager.UPDATE_ORDER_STATUS, orderToKitchen.id, OrderStatus.kitchen);

        this.removeOrderFromOrders(orderToKitchen.id);

        while (this.dishesInKitchen.length < numberOfCookingStands) {
            const dishToKitchen = this.itemsWaitingToKitchen.shift();
            console.log(dishToKitchen)
            if (dishToKitchen !== undefined) this.addToKitchen(dishToKitchen);
            else return;
        }

    }


}

export const queueListener = new QueueListener();
