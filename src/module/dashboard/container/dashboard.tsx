import React, {Component} from "react";
import dashboardStyle from './dashboard.module.scss';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import Queue from "../component/queue/queue.dashboard";
import {getAllOrders} from "../../../store/orders/order.selectors";
import {OrderState} from "../../../store/orders/order.types";
import Kitchen from "../component/kitchen/kitchen.dashboard";
import {getDishesInKitchen, getOrdersIdInDelivery, getOrdersIdInQueue} from "../../../store/queue/queue.selectors";
import {OrderInterface} from "../../../models/system/order.model";
import {addNewOrderToCancel} from "../../../store/orders/orders.actions";
import {DishInterface} from "../../../models/system/dish.model";
import composition from "../../../utils/composition";
import Modal from "../../../models/UI/modal/modal";
import DashboardModal from "../../../models/UI/modal/dashboard/modal-dashboard.modal";
import Delivery from "../component/delivery/delivery.dashboard";
import Timer from "../../shared/timer.shared";

interface State {
    showModal: boolean,
    orderClicked: OrderInterface | null
}

interface OwnProps {
}

interface PropsFromState {
    getAllOrders: any,
    getOrdersIdInQueue: string[],
    getDishesInKitchen: DishInterface[],
    getOrdersIdInDelivery: string[]
}

interface PropsFromDispatch {
    cancelOrder: typeof addNewOrderToCancel
}

type AllProps = OwnProps
    & PropsFromState
    & PropsFromDispatch;

class Dashboard extends Component<AllProps, State> {
    state: State = {
        showModal: false,
        orderClicked: null
    }

    cancelOrder = (orderId: string | null): void => {
        this.changeModalView();
        if (orderId !== null)
            this.props.cancelOrder(orderId)
    }

    changeModalView = (): void => {
        this.setState({showModal: !this.state.showModal})
    };

    onOrderClick = (orderId: string | null): void => {
        if (orderId === null) return;
        this.setState({
            orderClicked: this.props.getAllOrders[orderId], showModal: true
        })
    }

    itemsToOrders = (items: string[]): OrderInterface[] => {
        const orders: OrderInterface[] = [];
        if(items===undefined) return orders;
        for(let i=0; i<items.length; i++){
            const order: OrderInterface = this.props.getAllOrders[items[i]];
            order.deliveryEntryTime = Date.now();
            orders.push(order);
        }
        return orders;
    }


    render() {
        return (
            <div className={dashboardStyle.dashboard}>
                <Modal show={this.state.showModal} closeModal={this.changeModalView}>
                    <DashboardModal
                        order={this.state.orderClicked}
                        onCancelClick={this.cancelOrder}
                    />
                </Modal>
                <div className={dashboardStyle.Queues}>
                    <Queue
                        onOrderClick={this.onOrderClick}
                        ordersIdList={this.props.getOrdersIdInQueue}
                    />
                </div>
                <div className={dashboardStyle.Line}/>

                {/*<Kitchen/>*/}
                <div className={dashboardStyle.Kitchen}>
                    <Kitchen dishesList={this.props.getDishesInKitchen}/>
                </div>
                <div className={dashboardStyle.Line}/>

                {/*<Delivery/>*/}
                <div className={dashboardStyle.Delivery}>
                    {/*<Delivery ordersIdDelivery={this.itemsToOrders(this.props.getOrdersIdInDelivery)}/>*/}
                    <Timer time={5000}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: OrderState) => {
    return {
        getAllOrders: getAllOrders(state), // Dictionary of OrderType
        getOrdersIdInQueue: getOrdersIdInQueue(state), //Array of orders id
        getDishesInKitchen: getDishesInKitchen(state), //Array of DishType
        getOrdersIdInDelivery: getOrdersIdInDelivery(state) //Array of orders id
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        cancelOrder: (orderId: string) => dispatch(addNewOrderToCancel(orderId))
    }
}


export default composition<OwnProps>(
    // @ts-ignore
    Dashboard,
    connect(mapStateToProps, mapDispatchToProps)
);