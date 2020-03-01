import React, {Component} from "react";
import dashboardStyle from './dashboard.module.scss';
//redux
import {Dispatch} from "redux";
import {connect, ConnectedProps} from "react-redux";

import Queue from "../component/queue/queue.dashboard";
import {getAllOrders} from "../../../store/orders/order.selectors";
import {OrderType} from "../../../models/system/order.model";
import {OrderState} from "../../../store/orders/order.types";
import {dispatchAddNewOrderToCancel} from "../../../store/orders/orders.dispatch";
import Kitchen from "../component/kitchen/kitchen.dashboard";


interface dashboardState {
    showModal: boolean,
    orderToModal: OrderType | null
}

class Dashboard extends Component<PropsFromRedux> {

    cancelOrder = (orderId: number | null): void => {
        if (orderId !== null)
            this.props.cancelOrder(orderId)
    }

    render() {
        return (
            <div className={dashboardStyle.dashboard}>
                <div className={dashboardStyle.Queues}>
                    <Queue cancelOrder={this.cancelOrder} ordersList={this.props.getAllOrders}/>
                </div>
                {/*<Kitchen/>*/}
                <div className={dashboardStyle.Kitchen}>
                    <Kitchen ordersList={this.props.getAllOrders}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: OrderState) => {
    return {
        getAllOrders: getAllOrders(state),
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        cancelOrder: (orderId: number) => dispatchAddNewOrderToCancel(orderId, dispatch)
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Dashboard);