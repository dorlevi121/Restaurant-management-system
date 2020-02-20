import React, {Component} from "react";
import {connect, ConnectedProps} from "react-redux";
import {ordersInQueue} from "../../../store/shared/shared.selectors";
import {OrderState} from "../../../store/Order/order.types";
import {Dispatch} from "redux";
import {addOrderToQueue} from "../../../store/Dashboard/dashboard.dispatch";
import {sharedState} from "../../../store/shared/shared.types";
import Queue from '../component/queue/queue';
import Modal from "../../../models/UI/modal/modal";


class Dashboard extends Component<PropsFromRedux> {

    state = {
        showModal: false
    }
    orderInfo = (orderId: number) => {
        console.log(orderId)
    }


    render() {
        return (
            <div>
                <Modal/>
                <Queue ordersList={this.props.ordersInQueue} orderId={this.orderInfo}/>
            </div>
        );
    }
}

const mapStateToProps = (state: sharedState) => {
    return {
        ordersInQueue: ordersInQueue(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addOrderToQueue: (order: OrderState) => addOrderToQueue(order, dispatch)
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Dashboard);