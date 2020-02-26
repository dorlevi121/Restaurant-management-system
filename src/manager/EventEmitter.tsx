import {EventEmitter} from 'events';
import {OrderState} from "../store/orders/order.types";
import {OrderType} from "../models/system/order.model";
import {OrderStatus} from "../models/system/order-status.model";

export interface dataQueueListener {
    id: number,
    ttl: number //seconds
}

class QueueListener extends EventEmitter {
    constructor() {
        super();
        console.log('QueueListener - constructor')

    }

    addOrderToKitchen(data:OrderType ){
        this.emit('new order to kitchen', data)
    }

    addToKitchen(data: OrderType) {
        // data.status = OrderStatus.kitchen;
        // console.log('1: ' + data.status)
        let timer = 7, minutes, seconds;
        const x = setInterval( () => {
            //console.log(timer)
            minutes = parseInt(String(timer / 60), 10);
            seconds = parseInt(String(timer % 60), 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            console.log(minutes + ":" + seconds + ' (' + data.id + ')');
            if (--timer < 0) {
                clearInterval(x)
               // data.status = OrderStatus.queue;
                //console.log('2: ' + data.status)
                this.emit('order ready', data);
            }
        }, 1000);
    }


    destroy(){
        this.removeAllListeners();
        //todo: clearInterval
    }
}

export const queueListener = new QueueListener();


