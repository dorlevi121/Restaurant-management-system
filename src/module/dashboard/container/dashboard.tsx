import React, {Component} from "react";
import {connect, ConnectedProps} from "react-redux";
import {ordersInQueue} from "../../../store/shared/shared.selectors";
import {OrderState} from "../../../store/Order/order.types";
import {Dispatch} from "redux";
import {addOrderToQueue} from "../../../store/Dashboard/dashboard.dispatch";
import {sharedState} from "../../../store/shared/shared.types";
import Queue from '../component/queue/queue.dashboard';
import Modal from "../../../models/UI/modal/modal";

interface dashboardState {
    showModal: boolean,
    orderForModal: OrderState | null
}

class Dashboard extends Component<PropsFromRedux> {

    state: dashboardState = {
        showModal: false,
        orderForModal: null,
    }

    orderInfo = (orderId: number) => {
        const found = this.props.ordersInQueue.find((order: OrderState) => order.id === orderId);
        this.setState({
            showModal:true,
            orderForModal: found
        });
    }

    closeModal = ():void => {
        this.setState({
            showModal: false
        })
    }

    shouldComponentUpdate(nextProps: PropsFromRedux, nextState: dashboardState){
       if(this.props.ordersInQueue !== nextProps.ordersInQueue){
           this.setState({
               newOrder: nextProps.ordersInQueue[nextProps.ordersInQueue.length-1]
           })
           return true;
       }        
       else if( this.state.showModal !== nextState.showModal) return true;
        return false;
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showModal} order={this.state.orderForModal} closeModal={this.closeModal}/>
                <Queue orderId={this.orderInfo} ordersList={this.props.ordersInQueue}/>
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