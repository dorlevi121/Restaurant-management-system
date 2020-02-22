import React, {useState} from "react";
import queueStyle from './queue.module.scss';

import {OrderState} from "../../../../store/Order/order.types";
import {numberOfDashboards} from "../../../../config/config";


interface Props {
    ordersList: OrderState[],
    orderId: (id: number) => void
}

const Queue: React.FC<Props> = (props) => {
      const [queues, initQueues] = useState(orderedQueue(props.ordersList));

    return (
        <div className={queueStyle.Queue}>
            {queues.map((queue: OrderState[], index: number) => {
                return (
                    <div key={index}>
                        <div  className={queueStyle.Name}>Queue number {index} :</div>
                        {queue.map((order: OrderState, index: number) => {
                            return (
                                <div onClick={() => props.orderId(order.id)} key={index} className={queueStyle.Circle}>{order.id}</div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );

}



const orderedQueue = (orders: OrderState[]) => {
    let queues = Array(numberOfDashboards).fill(Array(0)); //Array of arrays
    let count = 0; //Represent queue number
    let indexInArray = 0; //Represent the position in the queue
    for (let i = 0; i < orders.length; i++) {
        if (count === numberOfDashboards) {
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