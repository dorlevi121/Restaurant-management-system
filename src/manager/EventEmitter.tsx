import {EventEmitter} from 'events';
import {numberOfCookingStands, numberOfMessengers} from "../config/config";

export interface orderListenerType {
    id: number,
    ttl: number, //seconds
    priority: number //Array priority location
}

class QueueListener extends EventEmitter {
    private orders: orderListenerType[]; //Hold sorted orders
    private ordersInKitchen: orderListenerType[]; //Hold orders in kitchen
    private ordersInDelivery: orderListenerType[]; // Hold orders in delivery

    constructor() {
        super();
        this.orders = [];
        this.ordersInKitchen = [];
        this.ordersInDelivery = [];
    }

    addNewOrderToWaiting = (order: orderListenerType) => {
        this.orders.splice(order.priority, 0, order);
        if (this.ordersInKitchen.length < numberOfCookingStands) {
            const orderToKitchen = this.orders.shift();
            this.emit('new order to kitchen', orderToKitchen);
        }
    }


    addToKitchen(data: orderListenerType) {
        this.emit('update status to kitchen', data.id);
        this.ordersInKitchen.push(data);
        let timer = 10, minutes, seconds;

        const x = setInterval(() => {
            minutes = parseInt(String(timer / 60), 10);
            seconds = parseInt(String(timer % 60), 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            console.log(minutes + ":" + seconds + ' (' + data.id + ')');
            if (--timer < 0) {
                clearInterval(x);
                this.emit('order ready', data.id);
                this.removeOrderFromArrays(data.id);
                if (this.orders.length !== 0 ) {
                    const orderToKitchen = this.orders.shift();
                    this.emit('new order to kitchen', orderToKitchen);
                }
            }
        }, 1000);
    }


    destroy() {
        this.removeAllListeners();
        //todo: clearInterval
    }

     removeOrderFromArrays = (orderId:number) => {
        for (let i = 0; i < this.ordersInKitchen.length; i++) {
            if (this.ordersInKitchen[i].id === orderId)
                this.ordersInKitchen.splice(i, 1);
        }
        for (let i = 0; i < this.orders.length; i++) {
            if (this.orders[i].id === orderId)
                this.orders.splice(i, 1);
        }
    }
}

export const queueListener = new QueueListener();


