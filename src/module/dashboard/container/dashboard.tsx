import React, {Component} from "react";
import dashboardStyle from './dashboard.module.scss';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import Queue from "../component/queue/queue.dashboard";
import {getAllOrders} from "../../../store/orders/order.selectors";
import {OrderState} from "../../../store/orders/order.types";
import Kitchen from "../component/kitchen/kitchen.dashboard";
import {getDishesInKitchen, getItemsInDelivery, getItemsInQueue} from "../../../store/queue/queue.selectors";
import {OrderInterface} from "../../../models/system/order.model";
import {addNewOrderToCancel} from "../../../store/orders/orders.actions";
import {DishInterface} from "../../../models/system/dish.model";
import composition from "../../../utils/composition";
import Modal from "../../../models/UI/modal/modal";
import DashboardModal from "../../../models/UI/modal/dashboard/modal-dashboard.modal";
import Delivery from "../component/delivery/delivery.dashboard";
import {getIngredientsQuantity} from "../../../store/storage/storage.selectors";
import {IngredientInterface} from "../../../models/system/ingredients.model";
import {returnIngredients, updateBudget} from "../../../store/storage/storage.actions";
import {ItemInterface} from "../../../models/system/item.model";
import {QueueState} from "../../../store/queue/queue.types";
import Alert from "../../../models/UI/alert/alert";

interface State {
    showModal: boolean,
    orderClicked: OrderInterface | null,
    showAlert: boolean
}

interface OwnProps {
}

interface PropsFromState {
    getAllOrders: { [id: string]: OrderInterface },
    getItemsInQueue: ItemInterface[],
    getDishesInKitchen: DishInterface[],
    getItemsInDelivery: ItemInterface[],
    getIngredientsQuantity: { [titile: string]: number }
}

interface PropsFromDispatch {
    cancelOrder: typeof addNewOrderToCancel,
    returnsIngredientsToStorage: typeof returnIngredients,
    updateBudget: typeof updateBudget
}

type AllProps = OwnProps
    & PropsFromState
    & PropsFromDispatch;

class Dashboard extends Component<AllProps, State> {
    state: State = {
        showModal: false,
        showAlert: false,
        orderClicked: null
    }

    cancelOrder = (orderId: string | null): void => {
        this.changeModalView();
        if (orderId !== null) {
            this.props.getAllOrders[orderId].dish.forEach(d => {
                this.props.returnsIngredientsToStorage(d.ingredients)
            });
            this.props.updateBudget(this.props.getAllOrders[orderId].price, 'reduce');
            this.props.cancelOrder(orderId);
            this.setState({showAlert: true});
            setTimeout(() => {
                this.setState({showAlert: false});
            }, 4000);
        }
    }

    changeModalView = (): void => {
        this.setState({showModal: !this.state.showModal})
    };

    onOrderClick = (item: ItemInterface): void => {
        console.log(item.orderId);

        if (item.orderId === null) return;
        this.setState({
            orderClicked: this.props.getAllOrders[item.orderId], showModal: true
        })
    }

    itemsToOrders = (items: ItemInterface[]): OrderInterface[] => {
        const orders: OrderInterface[] = [];
        if (items === undefined) return orders;
        for (let i = 0; i < items.length; i++) {
            const order: OrderInterface = this.props.getAllOrders[items[i].orderId];
            order.deliveryEntryTime = items[i].deliveryEntryTime;
            orders.push(order);
        }
        return orders;
    }

    render() {
        return (
            <div className={dashboardStyle.Dashboard}>
                <div className={dashboardStyle.Alert}>
                    <Alert msg={'Order Canceled'} type='success' show={this.state.showAlert}/>
                </div>
                <Modal show={this.state.showModal} closeModal={this.changeModalView}>
                    <DashboardModal
                        order={this.state.orderClicked}
                        onCancelClick={this.cancelOrder}/>
                </Modal>

                {/*<Queues/>*/}
                <div className={dashboardStyle.Queues}>
                    <Queue
                        onOrderClick={this.onOrderClick}
                        itemsList={this.props.getItemsInQueue}/>
                </div>
                <div className={dashboardStyle.Line}/>

                {/*<Kitchen/>*/}
                <div className={dashboardStyle.Kitchen}>
                    <Kitchen dishesList={this.props.getDishesInKitchen}/>
                </div>
                <div className={dashboardStyle.Line}/>

                {/*<Delivery/>*/}
                <div className={dashboardStyle.Delivery}>
                    <Delivery ordersIdDelivery={this.itemsToOrders(this.props.getItemsInDelivery)}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: OrderState | QueueState) => ({
    getAllOrders: getAllOrders(state), // Dictionary of OrderType
    getItemsInQueue: getItemsInQueue(state), //Array of orders id
    getDishesInKitchen: getDishesInKitchen(state), //Array of DishType
    getItemsInDelivery: getItemsInDelivery(state), //Array of orders id
    getIngredientsQuantity: getIngredientsQuantity(state), // Dictionary of ingredients
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    cancelOrder: (orderId: string) => dispatch(addNewOrderToCancel(orderId)),
    returnsIngredientsToStorage: (ingredients: IngredientInterface[]) => dispatch(returnIngredients(ingredients)),
    updateBudget: (amount: number, action: 'add' | 'reduce') => dispatch(updateBudget(amount, action))
})


export default composition<OwnProps>(
    // @ts-ignore
    Dashboard,
    connect(mapStateToProps, mapDispatchToProps)
);