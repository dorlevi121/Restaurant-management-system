import React, {Component} from 'react';
import {dataQueueListener, queueListener} from "./EventEmitter";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";

import {OrderState} from "../store/orders/order.types";
import {OrderType} from "../models/system/order.model";
import {getOrdersInKitchen, getOrdersNumber, getOrdersPriority} from "../store/orders/order.selectors";
import {
    dispatchAddNewOrderToKitchen,
    dispatchAddNewOrderToQueue, dispatchRemoveOrderFromKitchen,
    dispatchRemoveOrderFromQueue
} from "../store/orders/orders.dispatch";


class AddNewOrderManager extends Component <PropsFromRedux> {
    state = {
        count: 0
    }
    constructor(props: any) {
        super(props);
        console.log('AddNewOrderManager - constructor')

        queueListener.on('new order to kitchen', queueListener.addToKitchen);
        queueListener.on('order ready', this.removeFromKitchen)
    }

    removeFromKitchen = (order:OrderType) => {
        this.props.removeFromKitchen(order);
        //this.props.removeOrderFromQueue(order)
        queueListener.addOrderToKitchen(this.props.getPriorityArr[this.state.count]);
        this.setState({
            count: this.state.count +1
        })
    }

    shouldComponentUpdate(nextProps: Readonly<PropsFromRedux>, nextState: Readonly<{}>, nextContext: any): boolean {
        console.log('AddNewOrderManager - componentWillMount')
        return true

    }

    componentWillMount(): void {

        if (this.props.getPriorityArr.length === 1) {
            ///this.props.addOrderToKitchen(this.props.getPriorityArr[0])
            queueListener.addOrderToKitchen(this.props.getPriorityArr[this.state.count]);
            this.setState({
                count: this.state.count +1
            })
        }
    }

    render() {
        console.log('AddNewOrderManager - render')

        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = (state: OrderState) => {
    return {
        getOrdersNumber: getOrdersNumber(state),
        getPriorityArr: getOrdersPriority(state),
        getKitchenArr: getOrdersInKitchen(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addNewOrderToQueue: (order: OrderType) => dispatchAddNewOrderToQueue(order, dispatch),
        removeOrderFromQueue: (order: OrderType) => dispatchRemoveOrderFromQueue(order, dispatch),
        addOrderToKitchen: (order: OrderType) => dispatchAddNewOrderToKitchen(order, dispatch),
        removeFromKitchen: (order: OrderType) => dispatchRemoveOrderFromKitchen(order, dispatch)
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(AddNewOrderManager);