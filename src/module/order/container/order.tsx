import React, {Component} from "react";
import OrderStyle from "./order.module.scss";
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
import {getIngredientsQuantity} from "../../../store/storage/storage.selectors";
import {StorageState} from "../../../store/storage/storage.types";
import {IngredientInterface} from "../../../models/system/ingredients.model";
import {removeIngredients, updateBudget} from "../../../store/storage/storage.actions";
import Loading from "../../../models/UI/loading/loading";

interface State {
    dishes: DishInterface[];
    showModal: boolean;
    showAlert: boolean;
    msgAlert: string;
    loading: boolean;
    orderToModal: OrderInterface | null;
}

interface OwnProps {
}

interface PropsFromState {
    getAllOrders: any;
    getOrdersNumber: number;
    getIngredientsQuantity: { [titile: string]: number };
}

interface PropsFromDispatch {
    addNewOrderToQueue: typeof addNewOrderToQueue;
    removeOrderFromQueue: typeof removeOrderFromQueue;
    removeIngredients: typeof removeIngredients;
    updateBudget: typeof updateBudget;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class OrderComponent extends Component<AllProps, State> {
    state: State = {
        dishes: [],
        showModal: false,
        loading: false,
        showAlert: false,
        msgAlert: "",
        orderToModal: null
    };

    addOrderToQueue = (userType: UserType, dishes: DishInterface[]) => {
        if (!this.checkIngredientsQuantity(dishes)) {
            return;
        }

        dishes.forEach(d => {
            this.props.removeIngredients(d.ingredients);
            this.props.updateBudget(d.price, "add");
        });

        this.setState({
            loading: true,
            dishes: [],
            orderToModal: null,
            showModal: false
        });
        setTimeout(() => {
            this.setState({loading: false});
        }, 2500);
        this.props.addNewOrderToQueue(dishes, userType);
    };

    checkIngredientsQuantity = (dishes: DishInterface[]): boolean => {
        let ingCounter = cloneDeep(this.props.getIngredientsQuantity);
        let ans = true;

        //Check if there is ingredients in the stock for the order
        dishes.forEach((dish: DishInterface) => {
            dish.ingredients.forEach((i: IngredientInterface) => {
                if (i.amountInDish > 0) {
                    for (let j = 0; j < i.amountInDish; j++) {
                        if (ingCounter[i.title] === 0) {
                            this.changeAlertView(i.title.toString() + " not in stock.");
                            ingCounter = cloneDeep(this.props.getIngredientsQuantity);
                            ans = false;
                            return;
                        } else if (ingCounter[i.title] < i.amountInDish) {
                            this.changeAlertView("There is just " + this.props.getIngredientsQuantity[i.title] + " " + i.title + " in stock");
                            ingCounter = cloneDeep(this.props.getIngredientsQuantity);
                            ans = false;
                            return;
                        }
                        ingCounter[i.title]--;
                    }
                }
            });
        });
        if (!ans) return ans;
        //Check if there are more ingredients in the order than there are in the stock
        for (let key in ingCounter) {
            if (ingCounter[key] < 0) {
                this.changeAlertView("Not enough " + key.toString() + " in stock");
                ingCounter = cloneDeep(this.props.getIngredientsQuantity);
                return false;
            }
        }
        return true;
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
        this.setState({showModal: !this.state.showModal});
    };

    changeAlertView = (msg: string) => {
        this.setState({
            showAlert: true,
            msgAlert: msg
        });
        setTimeout(() => {
            this.setState({showAlert: false});
        }, 4000);
    };

    onNotificationClicked = () => {
        if (this.state.dishes.length) {
            this.changeModalView();
            return;
        }
        this.changeAlertView("You didnt choose any dish");
    };

    render() {
        const loading = this.state.loading;
        return (
            <div className={OrderStyle.OrderBody}>
                <div className={OrderStyle.Alert}>
                    <Alert
                        msg={this.state.msgAlert}
                        type={"danger"}
                        show={this.state.showAlert}
                    />
                </div>

                {loading && (
                    <div className={OrderStyle.Loading}>
                        <Loading/>
                    </div>
                )}
                <div
                    className={OrderStyle.Notification}
                    onClick={this.onNotificationClicked}
                >
                    <Notifications
                        notificationsNumber={this.state.dishes.length}
                        title="Cart"
                    />
                </div>

                <div className={OrderStyle.Order}>
                    <Modal show={this.state.showModal} closeModal={this.changeModalView}>
                        <OrderModal
                            dishes={this.state.dishes}
                            onOrderClick={this.addOrderToQueue}
                        />
                    </Modal>

                    <div className={OrderStyle.Dishes}>
                        <Dishes addNewDish={this.addNewDish}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: OrderState | StorageState) => ({
    getAllOrders: getAllOrders(state),
    getOrdersNumber: getOrdersNumber(state),
    getIngredientsQuantity: getIngredientsQuantity(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addNewOrderToQueue: (dishes: DishInterface[], userType: UserType) =>
        dispatch(addNewOrderToQueue(dishes, userType)),
    removeIngredients: (ingredients: IngredientInterface[]) =>
        dispatch(removeIngredients(ingredients)),
    updateBudget: (amount: number, action: "add" | "reduce") =>
        dispatch(updateBudget(amount, action))
});

const Order = composition<OwnProps>(
    // @ts-ignore
    OrderComponent,
    connect(mapStateToProps, mapDispatchToProps)
);

export default Order;
