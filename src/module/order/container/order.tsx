import React, {Component} from "react";
import orderStyle from './order.module.scss';
import Dishes from "../component/dishes/dishes.component";
import menu from "../../../constants/allDishes";
import {Dispatch} from "redux";
import {OrderState} from "../../../store/orders/order.types";
import {getAllOrders, getOrdersNumber} from "../../../store/orders/order.selectors";
import {OrderInterface} from "../../../models/system/order.model";
import {UserType} from "../../../models/system/user-type.enum";
import {DishInterface} from "../../../models/system/dish.model";
import {addNewOrderToQueue, removeOrderFromQueue} from "../../../store/orders/orders.actions";
import Notifications from "../../../models/UI/notifications/notifications";
import Modal from "../../../models/UI/modal/modal";
import OrderModal from "../../../models/UI/modal/order/modal-order.modal";
import composition from "../../../utils/composition";
import {connect} from "react-redux";
import {cloneDeep, uniqueId} from "lodash";
import Alert from "../../../models/UI/alert/alert";

interface State {
    dishes: DishInterface [],
    showModal: boolean,
    showAlert: boolean
    loading: boolean,
    orderToModal: OrderInterface | null
}

interface OwnProps {
}

interface PropsFromState {
    getAllOrders: any,
    getOrdersNumber: number
}

interface PropsFromDispatch {
    addNewOrderToQueue: typeof addNewOrderToQueue,
    removeOrderFromQueue: typeof removeOrderFromQueue,
}

type AllProps = OwnProps
    & PropsFromState
    & PropsFromDispatch;


class OrderComponent extends Component<AllProps, State> {
    state: State = {
        dishes: [],
        showModal: false,
        showAlert: false,
        loading: false,
        orderToModal: null
    };

    addOrderToQueue = (userType: UserType, dishes: DishInterface[]) => {
        // setTimeout(() => {
        //     this.setState({loading: false})
        // }, 4000);
        this.setState({loading: true, dishes: [], orderToModal: null, showModal: false});
        this.props.addNewOrderToQueue(dishes, userType);
    };

    addNewDish = (disId: number): void => {
        const dish = cloneDeep(menu[disId]);
        dish.id = uniqueId();
        dish.ingredients.forEach(i => {
            i.amountInDish++;
            i.myDishId = dish.id;
        });
        this.setState({dishes: [...this.state.dishes, dish]});
    };

    changeModalView = (): void => {
        this.setState({showModal: !this.state.showModal})
    };

    onNotificationClicked = () => {
        if (this.state.dishes.length) {
            this.changeModalView()
            return;
        }
        alert('You didn\'t choose any dish');
    };

    render() {
        const loading = this.state.loading;
        return (
            <div className={orderStyle.OrderBody}>
                {/*{loading && <div className={orderStyle.Loading}>*/}
                {/*    <Loading/>*/}
                {/*</div>}*/}

                <div
                    className={orderStyle.Notification}
                    onClick={this.onNotificationClicked}>
                    <Notifications
                        notificationsNumber={this.state.dishes.length}
                        title='Cart'
                    />
                </div>

                <div className={orderStyle.Order}>
                    <Modal
                        show={this.state.showModal}
                        closeModal={this.changeModalView}>
                        <OrderModal
                            dishes={this.state.dishes}
                            onOrderClick={this.addOrderToQueue}
                        />
                    </Modal>

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

const mapStateToProps = (state: OrderState) => ({
    getAllOrders: getAllOrders(state),
    getOrdersNumber: getOrdersNumber(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addNewOrderToQueue: (dishes: DishInterface[], userType: UserType) => dispatch(addNewOrderToQueue(dishes, userType))
});

const Order = composition<OwnProps>(
    // @ts-ignore
    OrderComponent,
    connect(mapStateToProps, mapDispatchToProps)
);

export default Order;