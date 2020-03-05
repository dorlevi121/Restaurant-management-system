import React, {Component} from "react";
import queueStyle from './queue.module.scss';
import {numberOfQueues} from "../../../../config/config";
import {OrderInterface} from "../../../../models/system/order.model";
import {ItemInterface} from "../../../../models/system/item.model";


interface Props {
    itemsList: ItemInterface[],
    onOrderClick: (items: ItemInterface) => void
}

class Queue extends Component <Props> {
    constructor(props: any) {
        super(props);
    }

    state = {
        showDuration: false,
        showModal: false,
        orderClicked: undefined
    }

    orderedQueue = (orders:ItemInterface[]) => {
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
    }

    onMouseHover = () => this.setState({showDuration: !this.state.showDuration});


    render() {
        return (
            <div className={queueStyle.Queue}>
                {this.orderedQueue(this.props.itemsList).map((queue: ItemInterface[]) => {
                    return (
                        <div key={Math.random()} className={queueStyle.Line}>
                            {queue.map((order: ItemInterface) => {
                                return (
                                    <div key={Math.random()} className={queueStyle.Order}
                                         onMouseEnter={this.onMouseHover} onMouseLeave={this.onMouseHover}
                                         onClick={()=>this.props.onOrderClick(order)}>
                                        {order}
                                    {/*    <span className={queueStyle.DurationModal}>*/}
                                    {/*    {this.state.showDuration && <a>Duration: {order.totalTime}</a>}*/}
                                    {/*</span>*/}

                                    </div>
                                )
                            })}
                        </div>
                    )
                })}

            </div>
        );

    }
}

export default Queue;