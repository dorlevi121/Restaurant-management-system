import React, {Component} from "react";
//redux
import {Dispatch} from "redux";
import {connect, ConnectedProps} from "react-redux";
import {getOrdersInQueue} from "../../../store/shared/shared.selectors";
import {getOrdersInKitchen, getOrdersPriority} from '../../../store/Dashboard/dashboard.selectors';
import {addOrderToQueue, RemoveOrderFromQueue} from "../../../store/shared/shared.dispatch";
import {sharedState} from "../../../store/shared/shared.types";
import {OrderState} from "../../../store/Order/order.types";
import {addOrderToKitchen, addOrdersPriority} from "../../../store/Dashboard/dashboard.dispatch";

import Queue from '../component/queue/queue.dashboard';
import Modal from "../../../models/UI/modal/modal";
import Kitchen from "../component/kitchen/kitchen.dashboard";
import * as helperFunctions from './helper/helper.dashboard';


interface dashboardState {
    showModal: boolean,
    orderToModal: OrderState | null
}

class Dashboard extends Component<PropsFromRedux> {

    state: dashboardState = {
        showModal: false,
        orderToModal: null,
    }


    orderInfo = (orderId: number) => {
        const found = this.props.getOrdersInQueue.find((order: OrderState) => order.id === orderId);
        this.setState({
            showModal: true,
            orderForModal: found
        });
    }


    closeModal = (): void => {
        this.setState({
            showModal: false
        })
    }


    shouldComponentUpdate(nextProps: PropsFromRedux, nextState: dashboardState) {
        if (this.state.showModal !== nextState.showModal) return true;

        return false;
    }

    componentDidMount(): void {
        //console.log('[dashboard componentDidMount]: ' + this.props.getOrdersPriority)
    }


    render() {
        //Send all the orders to QueueToKitchen. QueueToKitchen - Arranges all orders by order type and order time
        //and return ordered array to the state
        // if (this.props.getOrdersInQueue.length)
        //     this.props.addOrdersPriority(helperFunctions.QueueToKitchen(this.props.getOrdersInQueue));
        return (
            <div>
                <Modal show={this.state.showModal} order={this.state.orderToModal} closeModal={this.closeModal}/>
                <Queue orderId={this.orderInfo} ordersList={this.props.getOrdersInQueue}/>
                <Kitchen/>
            </div>
        );
    }
}

const mapStateToProps = (state: sharedState) => {
    return {
        getOrdersInQueue: getOrdersInQueue(state),
        getOrdersInKitchen: getOrdersInKitchen(state),
        getOrdersPriority: getOrdersPriority(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addOrderToQueue: (newOrder: OrderState) => addOrderToQueue(newOrder, dispatch),
        removeOrderFromQueue: (removeOrder: OrderState) => RemoveOrderFromQueue(removeOrder, dispatch),
        addOrdersPriority: (ordersPriority: OrderState[]) => addOrdersPriority(ordersPriority, dispatch),
        addOrderToKitchen: (order: OrderState) => addOrderToKitchen(order, dispatch)
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Dashboard);