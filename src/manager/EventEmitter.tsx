import {EventEmitter} from 'events';
import {numberOfCookingStands, numberOfMessengers} from "../config/config";
import {OrderStatus} from "../models/system/order-status.model";

export interface orderListenerType {
    id: number,
    ttl: number, //seconds
    priority: number //Array priority location
}

class QueueListener extends EventEmitter {
    private orders: orderListenerType[]; //Hold sorted orders
    private ordersInKitchen: orderListenerType[]; //Hold orders in kitchen
    private orderWaitingToDelivery: orderListenerType [];
    private ordersInDelivery: orderListenerType[]; // Hold orders in delivery

    constructor() {
        super();
        this.orders = [];
        this.ordersInKitchen = [];
        this.ordersInDelivery = [];
        this.orderWaitingToDelivery = [];
    }

    addNewOrderToPend = (order: orderListenerType) => {
        this.orders.splice(order.priority, 0, order);
        if (this.ordersInKitchen.length < numberOfCookingStands) {
            const orderToKitchen = this.orders.shift();
            this.emit('new order to kitchen', orderToKitchen);
        }
    }


    addToKitchen(data: orderListenerType) {
        this.emit('update order status', data.id, OrderStatus.kitchen);
        this.ordersInKitchen.push(data);
        this.removeOrderFromOrders(data.id);
        let timer = 10, minutes, seconds;

        const kitchenInterval = setInterval(() => {
            minutes = parseInt(String(timer / 60), 10);
            seconds = parseInt(String(timer % 60), 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            console.log(minutes + ":" + seconds + ' (' + data.id + ')');
            if (--timer < 0) {
                clearInterval(kitchenInterval);
                this.removeOrderFromKitchen(data.id);
                this.orderWaitingToDelivery.push(data);
                this.emit('update order status', data.id, OrderStatus.waiting_to_delivery);
                if(this.ordersInDelivery.length < numberOfMessengers) {
                    const nextDelivery = this.orderWaitingToDelivery.pop();
                    if(nextDelivery !== undefined) this.addToDelivery(nextDelivery)
                }
                if (this.orders.length !== 0 ) {
                    const orderToKitchen = this.orders.shift();
                    this.emit('new order to kitchen', orderToKitchen);
                }
            }
        }, 1000);
    }


    addToDelivery = (data: orderListenerType):void => {
        this.ordersInDelivery.push(data)
        this.emit('update order status', data.id, OrderStatus.delivery);
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
                this.ordersInDelivery.pop();
                this.emit('order finished', data.id);
                if(this.orderWaitingToDelivery.length !== 0){
                    const nextDelivery = this.orderWaitingToDelivery.pop();
                    if(nextDelivery !== undefined) this.addToDelivery(nextDelivery)
                }
            }
        }, 1000)
    }

    destroy() {
        this.removeAllListeners();
        //todo: clearInterval
    }

    removeOrderFromKitchen = (orderId:number) => {
        for (let i = 0; i < this.ordersInKitchen.length; i++) {
            if (this.ordersInKitchen[i].id === orderId)
                this.ordersInKitchen.splice(i, 1);
        }
    }

     removeOrderFromOrders = (orderId:number) => {
        for (let i = 0; i < this.orders.length; i++) {
            if (this.orders[i].id === orderId)
                this.orders.splice(i, 1);
        }
    }

    removeOrderFromDelivery = (orderId:number) => {
        for (let i = 0; i < this.ordersInDelivery.length; i++) {
            if (this.ordersInDelivery[i].id === orderId)
                this.ordersInDelivery.splice(i, 1);
        }
    }
}

export const queueListener = new QueueListener();


