import React, {Component} from "react";
import {DishInterface} from "../../../system/dish.model";
import CheckBox from "../../chackbox/checkbox";
import Button from "../../button/button";
import {UserType} from "../../../system/user-type.enum";
import orderModalStyle from "./modal-order.module.scss";
import {IngredientInterface} from "../../../system/ingredients.model";
import {cloneDeep} from "lodash";
import Input from "../../input/input";
import Alert from "../../alert/alert";

interface State {
    userTypes: { id: number; value: string; isChecked: boolean }[];
    dishes: DishInterface[];
    showAlert: boolean;
    msgAlert: string;
    typeAlert: "danger" | "success";
    showIngredient: boolean
}

interface OwnProps {
    dishes: DishInterface[];
    onOrderClick: (userType: UserType, dishes: DishInterface[]) => void;
}

class OrderModal extends Component<OwnProps, State> {
    state: State = {
        userTypes: [
            {id: 0, value: "Regular", isChecked: true},
            {id: 1, value: "Member", isChecked: false},
            {id: 2, value: "VIP", isChecked: false}
        ],
        dishes: [],
        showAlert: false,
        msgAlert: "",
        typeAlert: "danger",
        showIngredient: false
    };

    componentWillReceiveProps(nextProps: any) {
        this.setState({dishes: nextProps.dishes});
    }

    checkUserType = (event: any) => {
        let types = cloneDeep(this.state.userTypes);
        types.forEach(type => {
            if (type.isChecked) type.isChecked = false;
            if (type.value === event.target.value)
                type.isChecked = event.target.checked;
        });
        this.setState({
            userTypes: types
        });
    };

    onClickOrder = () => {
        const typeOfUser = this.state.userTypes.filter(type => type.isChecked);
        if (!typeOfUser.length) {
            this.setState({
                showAlert: true,
                msgAlert: "You didnt choose user type",
                typeAlert: "danger"
            });
            setTimeout(() => {
                this.setState({
                    showAlert: false,
                    msgAlert: ""
                });
            }, 4000);
            return;
        }

        let ing = 0;
        this.state.dishes.forEach(d => {
            d.ingredients.forEach(i => {
                if (i.amountInDish > 0) {
                    ing++;
                }
            });
        });

        if (ing === 0) {
            this.setState({
                showAlert: true,
                msgAlert: "You didn't choose any ingredient",
                typeAlert: "danger"
            });
            setTimeout(() => {
                this.setState({
                    showAlert: false,
                    msgAlert: ""
                });
            }, 4000);
            return;
        }

        let type: UserType;
        if (typeOfUser[0].value === "VIP") type = UserType.vip;
        else if (typeOfUser[0].value === "Member") type = UserType.member;
        else type = UserType.regular;

        this.props.onOrderClick(type, cloneDeep(this.state.dishes));

        this.setState({
            userTypes: [
                {id: 0, value: "Regular", isChecked: true},
                {id: 1, value: "Member", isChecked: false},
                {id: 2, value: "VIP", isChecked: false}
            ]
        });
    };

    updateIngredients = (e: any, ingredient: IngredientInterface): void => {
        const dish = cloneDeep(this.state.dishes.find(d => d.id === ingredient.myDishId));
        if (dish === undefined) {
            return;
        }

        const newIngredient = dish.ingredients.find(
            i => i.title === ingredient.title
        );
        if (newIngredient === undefined) {
            return;
        }

        const allDishes = cloneDeep(this.state.dishes);
        const dishIndex = allDishes.findIndex(d => d.id === dish.id);

        switch (e.target.value) {
            case "+": {
                newIngredient.amountInDish++;
                dish.price += newIngredient.price;
                dish.duration += newIngredient.duration;
                allDishes.splice(dishIndex, 1, dish);
                this.setState({dishes: allDishes});
                return;
            }

            case "-": {
                if (!newIngredient.amountInDish) return;
                newIngredient.amountInDish--;
                dish.price -= newIngredient.price;
                dish.duration -= newIngredient.duration;
                allDishes.splice(dishIndex, 1, dish);
                this.setState({dishes: allDishes});
                return;
            }
        }
    };

    cancelDish = (dish: DishInterface): void => {
        const allDishes = cloneDeep(this.state.dishes);
        const dishIndex = allDishes.findIndex(d => d.id === dish.id);
        allDishes.splice(dishIndex, 1);
        this.setState({dishes: allDishes})
    }

    calculateTotalTime = () => {
        let timer = 0,
            minutes,
            seconds;
        for (let i = 0; i < this.state.dishes.length; i++) {
            timer += this.state.dishes[i].duration;
        }
        minutes = parseInt(String(timer / 60), 10);
        seconds = parseInt(String(timer % 60), 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return " " + minutes + ":" + seconds;
    };

    calculateTotalPrice = () => {
        let totalPrice = 0;
        for (let i = 0; i < this.state.dishes.length; i++) {
            totalPrice += this.state.dishes[i].price;
        }
        return totalPrice;
    };

    keepLabelOpen = () => {
        this.setState({showIngredient: !this.state.showIngredient})
    }

    render() {
        const show = this.state.showIngredient ? {display: 'block'} : {display: 'none'}
        return (
            <div>
                <div className={orderModalStyle.Boxes}>
                    <div className={orderModalStyle.OrderSummary}>
                        <div className={orderModalStyle.PriceNdish}>
                            <p>Dish</p> <p>Price</p>
                        </div>
                        {this.state.dishes.map((dish: DishInterface, i: number) => (
                            <div className={orderModalStyle.Dish} key={Math.random()}>
                                <input
                                    className={orderModalStyle.ToggleBox}
                                    id={i.toString()}
                                    type="checkbox"
                                />
                                <label onClick={() => this.keepLabelOpen()} className={orderModalStyle.Label}
                                       htmlFor={i.toString()}>
                                    <p className={orderModalStyle.DishTitle}>{dish.title}</p>
                                </label>
                                <div style={show} className={orderModalStyle.Ingredients}>
                                    {dish.ingredients.map((i: IngredientInterface) => {
                                        return (
                                            <div
                                                key={Math.random()}
                                                className={orderModalStyle.Ingredient}
                                            >
                                                <p>{i.title} <img src={i.image} alt={i.title}/></p>

                                                <Input
                                                    ingredient={i}
                                                    onClickInput={this.updateIngredients}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={orderModalStyle.Cancel}>
                                  <span onClick={() => this.cancelDish(dish)}
                                        className={orderModalStyle.CancelDish}>
                                  &#10005;
                                </span>
                                    <span className={orderModalStyle.DishPrice}>
                                  {dish.price}&#36;
                                 </span>
                                </div>
                            </div>
                        ))}

                        <div className={orderModalStyle.TotalPrice}>
                            <p>Total Price:</p>
                            <p>{this.calculateTotalPrice()}&#36;</p>
                        </div>
                    </div>
                    <hr/>

                    <div className={orderModalStyle.OrderSummary}>
                        <div className={orderModalStyle.typesNtime}>
                            <p style={{fontWeight: 600}}>Customer type:</p>

                            <ul className={orderModalStyle.CheckBox}>
                                {this.state.userTypes.map(type => {
                                    return (
                                        <CheckBox
                                            key={Math.random()}
                                            checkUserType={this.checkUserType}
                                            {...type}
                                        />
                                    );
                                })}
                            </ul>

                            <div className={orderModalStyle.Duration}>
                                <p style={{fontWeight: 600}}>Duration:</p>
                                <p>{this.calculateTotalTime()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div onClick={this.onClickOrder} className={orderModalStyle.Button}>
                    <Button text="Order"/>
                </div>

                <div className={orderModalStyle.Alert}>
                    <Alert
                        msg={this.state.msgAlert}
                        type={this.state.typeAlert}
                        show={this.state.showAlert}
                    />
                </div>
            </div>
        );
    }
}

export default OrderModal;