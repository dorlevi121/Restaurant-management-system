import React from "react";
import queueStyle from './queue.module.scss';

import {DashboardState} from "../../../../store/Dashboard/dashboard.types";
import {Dispatch} from "redux";
import {OrderState} from "../../../../store/Order/order.types";
import {addOrderToQueue} from "../../../../store/Dashboard/dashboard.dispatch";
import {connect, ConnectedProps} from "react-redux";
import Modal from "../../../../models/UI/modal/modal";

interface Props {
    queueNumber?: number
}

const queue: React.FC<PropsFromRedux & Props> = (props) => {
    return (
        <div className={queueStyle.queue}>
            <Modal/>
            <div className={queueStyle.name}>Queue number {props.queueNumber}:</div>
            {/*{props.ordersInQueue.map(order => {*/}
            {/*    return(*/}
            {/*        <div className={queueStyle.circle}>{order.id}</div>*/}
            {/*    )*/}
            {/*})}*/}
        </div>
    );
}

const mapStateToProps = (state: DashboardState) => {
    return {
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addOrderToQueue: (order: OrderState) => addOrderToQueue(order, dispatch)
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(queue);