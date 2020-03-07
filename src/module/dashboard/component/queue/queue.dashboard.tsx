import React, { Component } from "react";
import queueStyle from "./queue.module.scss";
import { numberOfQueues } from "../../../../config/config";
import { ItemInterface } from "../../../../models/system/item.model";

interface Props {
  itemsList: ItemInterface[];
  onOrderClick: (items: ItemInterface) => void;
}

class Queue extends Component<Props> {
  constructor(props: any) {
    super(props);
  }

  state = {
    showModal: false,
    orderClicked: undefined
  };

  orderedQueue = (orders: ItemInterface[]) => {
    let queues = Array(numberOfQueues).fill(Array(0)); //Array of arrays
    let count = 0; //Represent queue number
    let indexInArray = 0; //Represent the position in the queue
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      if (order === undefined) continue;
      if (count === numberOfQueues) {
        count = 0;
        indexInArray++;
      }
      let copyAllArr = [...queues];
      let copyInnerArr = [...copyAllArr[count]];
      copyInnerArr[indexInArray] = order;
      copyAllArr[count++] = copyInnerArr;
      queues = copyAllArr;
    }
    return queues;
  };

  render() {
    return (
      <div className={queueStyle.Queue}>
        {this.orderedQueue(this.props.itemsList).map(
          (queue: ItemInterface[]) => {
            return (
              <div key={Math.random()} className={queueStyle.Line}>
                {queue.map((order: ItemInterface) => {
                  return (
                    <div
                      key={Math.random()}
                      className={queueStyle.Order}
                      onClick={() => this.props.onOrderClick(order)}
                    >
                      {order.orderId}
 
                    </div>
                  );
                })}
              </div>
            );
          }
        )}
      </div>
    );
  }
}

export default Queue;
