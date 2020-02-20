import React, {Component} from "react";
import dashboardStyle from './Dashboard.module.scss';
import {connect, ConnectedProps} from "react-redux";

import {DashboardState} from "../../../store/Dashboard/dashboard.types";
import {ordersInQueue} from "../../../store/shared/shared.selectors";
import {OrderState} from "../../../store/Order/order.types";
import {Dispatch} from "redux";
import {addOrderToQueue} from "../../../store/Dashboard/dashboard.dispatch";
import Queue from '../component/queue/queue';
import Modal from '../../../models/UI/modal/modal';
import {sharedState} from "../../../store/shared/shared.types";

class Dashboard extends Component<PropsFromRedux > {

    render() {
        console.log(this.props.ordersInQueue)
        return (
            <div >
                <Queue queueNumber={1}/>
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
        addOrderToQueue: (order:OrderState) => addOrderToQueue(order, dispatch)
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Dashboard);