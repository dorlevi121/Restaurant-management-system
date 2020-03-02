import React, {Component} from "react";
import queueStyle from './queue.module.scss';
import {OrderType} from "../../../../models/system/order.model";
import {queueListener} from "../../../../manager/manager-orders";
import {numberOfQueues} from "../../../../config/config";
import {OrderStatus} from "../../../../models/system/order-status.model";
import Modal from "../../../../models/UI/modal/modal";
import DashboardModal from "../../../../models/UI/modal/dashboard/moda-dashboard.model";

interface Props {
    ordersList: OrderType[],
    cancelOrder: (orderId: number | null) => void
}

class Queue extends Component <Props> {
    constructor(props: any) {
        super(props);
        this.cancelOrder = this.cancelOrder.bind(this);
    }
    
    state = {
        showDuration: false,
        showModal: false,
        orderClicked: null
    }

    orderedQueue = (orders:OrderType[]) => {

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

    

    onMouseHover = () => {
        this.setState({showDuration: !this.state.showDuration})
    }

    closeModal = (): void => {
        this.setState({showModal: false})
    }

    cancelOrder = (orderId: number | null): void => {
        this.setState({showModal: false});
        this.props.cancelOrder(orderId);
    }
    onClickOrder = (orderId: number) => {
        this.setState({showModal: true, orderClicked: this.props.ordersList[orderId]})
        const order = this.props.ordersList[orderId];
    }

    render() {        
        return (
            <div className={queueStyle.Queue}>
                {this.orderedQueue(this.props.ordersList).map((queue: OrderType[], index: number) => {
                    return (
                        <div key={Math.random()} className={queueStyle.Line}>
                            {queue.map((order: OrderType, index: number) => {
                                return (
                                    <div key={Math.random()} className={queueStyle.Order}
                                         onMouseEnter={this.onMouseHover} onMouseLeave={this.onMouseHover}
                                         onClick={this.onClickOrder.bind(this, order.id)}>
                                        {order.id}
                                        <span className={queueStyle.DurationModal}>
                                        {this.state.showDuration && <a>Duration: {order.totalTime}</a>}
                                    </span>

                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
                <Modal show={this.state.showModal} closeModal={this.closeModal}>
                    <DashboardModal order={this.state.orderClicked}
                                    onCancelClick={this.cancelOrder}/>
                </Modal>
            </div>
        );

    }
}

export default Queue;