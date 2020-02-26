import React, {useState} from "react";
import queueStyle from './queue.module.scss';

import {numberOfQueues} from "../../../../config/config";
import {OrderType} from "../../../../models/system/order.model";


interface Props {
    ordersList: Map<number,OrderType>,
    orderId: (id: number) => void
}

const Queue: React.FC<Props> = (props) => {
    //const [queues, initQueues] = useState(orderedQueue(props.ordersList));

    return (
        <div>
            {}
        </div>
        // <div className={queueStyle.Queue}>
        //     {props.ordersList.map((queue: OrderType[], index: number) => {
        //         return (
        //             <div key={index}>
        //                 <div className={queueStyle.Name}>Queue number {index} :</div>
        //                 {queue.map((order: OrderType, index: number) => {
        //                     return (
        //                         <div onClick={() => props.orderId(order.id)}
        //                              key={index}
        //                              className={queueStyle.Circle}>
        //                             {order.id}
        //                         </div>
        //                     )})}
        //             </div>
        //         )
        //     })}
        // </div>
    );

}


const orderedQueue = (orders: OrderType[]) => {
    let queues = Array(numberOfQueues).fill(Array(0)); //Array of arrays
    let count = 0; //Represent queue number
    let indexInArray = 0; //Represent the position in the queue
    for (let i = 0; i < orders.length; i++) {
        if (count === numberOfQueues) {
            count = 0;
            indexInArray++;
        }
        let copyAllArr = [...queues];
        let copyInnerArr = [...copyAllArr[count]];
        copyInnerArr[indexInArray] = orders[i];
        copyAllArr[count++] = copyInnerArr;
        queues = copyAllArr;
    }
    return queues;
}

export default Queue;