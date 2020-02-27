import React, {Component} from "react";

import orderStyle from './order.module.scss';
import Dishes from "../component/dishes/dishes";
import menu from "../../../assets/dishes/allDishes";
//redux
import {Dispatch} from "redux";
import {OrderState} from "../../../store/orders/order.types";
import {connect, ConnectedProps} from "react-redux";

import {getAllOrders, getOrdersNumber, getOrdersPriority} from "../../../store/orders/order.selectors";
import {OrderType} from "../../../models/system/order.model";
import {UserType} from "../../../models/system/user-type.model";
import {OrderStatus} from "../../../models/system/order-status.model";
import {DishType} from "../../../models/system/dish.model";
import {dispatchAddNewOrderToQueue, dispatchRemoveOrderFromQueue} from "../../../store/orders/orders.dispatch";
import Notifications from "../../../models/UI/notifications/notifications";
import Modal from "../../../models/UI/modal/modal";

interface StateType {
    dishes: DishType [],
    showModal: boolean,
    orderToModal: OrderType | null
}

class Order extends Component <PropsFromRedux> {

    state: StateType = {
        dishes: [],
        showModal: false,
        orderToModal: null
    }

    addOrderToQueue = (order: OrderType) => {
        this.props.addNewOrderToQueue(order);
        this.setState({
            showModal: false
        })

    }

    addNewDish = (disId: number): void => {
        const dish = menu[disId];
        this.setState({dishes: [...this.state.dishes, dish]})
    }

    initNewOrder = (): void => {
        let totalTime = 0, price = 0;
        for (let i in this.state.dishes) {
            totalTime += this.state.dishes[i].duration;
            price += this.state.dishes[i].price
        }

        const order: OrderType = {
            id: this.props.getOrdersNumber,
            dish: this.state.dishes,
            userType: totalTime > 100 ? UserType.member : UserType.vip,
            totalTime: totalTime,
            price: price,
            status: OrderStatus.queue
        }
        this.setState({showModal: true, orderToModal: order})
        this.setState({dishes: []})
    }

    closeModal = (): void => {
        this.setState({showModal: false})
    }

    render() {
        return (
            <div className={orderStyle.OrderBody}>

                <div className={orderStyle.Notification} onClick={() => {
                    (this.state.dishes.length) > 0 ? this.initNewOrder() : alert('You didn\'t choose any dish')
                }}>
                    <Notifications notificationsNumber={this.state.dishes.length} title='Cart'/>
                </div>

                <div className={orderStyle.Order}>
                    <Modal onOrderClick={this.addOrderToQueue} closeModal={this.closeModal} show={this.state.showModal}
                           order={this.state.orderToModal}/>
                    <div className={orderStyle.Dishes}>
                        <div className={orderStyle.Dish}>
                            <Dishes addNewDish={this.addNewDish}/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: OrderState) => {
    return {
        getAllOrders: getAllOrders(state),
        getOrdersNumber: getOrdersNumber(state),
        getPriorityArr: getOrdersPriority(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addNewOrderToQueue: (order: OrderType) => dispatchAddNewOrderToQueue(order, dispatch),
        removeOrderFromQueue: (order: OrderType) => dispatchRemoveOrderFromQueue(order, dispatch)
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>


export default connector(Order);