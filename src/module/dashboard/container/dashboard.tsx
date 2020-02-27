import React, {Component} from "react";
import dashboardStyle from './dashboard.module.scss';
//redux
import {Dispatch} from "redux";
import {connect, ConnectedProps} from "react-redux";


import Modal from "../../../models/UI/modal/modal";
import * as helperFunctions from './helper/helper.dashboard'
import Queue from "../component/queue/queue.dashboard";
import {getAllOrders, getOrdersPriority} from "../../../store/orders/order.selectors";
import {OrderType} from "../../../models/system/order.model";
import {OrderState} from "../../../store/orders/order.types";

interface dashboardState {
    showModal: boolean,
    orderToModal: OrderType | null
}

class Dashboard extends Component<PropsFromRedux> {

    state: dashboardState = {
        showModal: false,
        orderToModal: null,
    }


    orderInfo = (orderId: number) => {
        const found = this.props.getAllOrders.find((order: OrderType) => order.id === orderId);
        this.setState({
            showModal: true,
            orderToModal: found });
    }

    closeModal = (): void => {
        this.setState({
            showModal: false
        })
    }


    render() {
        console.log(this.props.getPriorityOrders)
        return (
            <div className={dashboardStyle.dashboard}>
                {/*<Modal show={this.state.showModal} order={this.state.orderToModal} closeModal={this.closeModal}/>*/}
                <div className={dashboardStyle.Queues}>
                    <Queue orderId={this.orderInfo} ordersList={this.props.getPriorityOrders}/>
                </div>
                {/*<Kitchen/>*/}
            </div>
        );
    }
}

const mapStateToProps = (state: OrderState) => {
    return {
        getAllOrders: getAllOrders(state),
        getPriorityOrders: getOrdersPriority(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {

    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Dashboard);