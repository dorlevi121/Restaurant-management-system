import React, {useEffect, useState} from "react";
import {DishInterface} from "../../../system/dish.model";
import CheckBox from "../../chackbox/checkbox";
import Button from "../../button/button";
import {UserType} from "../../../system/user-type.enum";
import orderModalStyle from './modal-order.module.scss';
import {IngredientInterface} from "../../../system/ingredients.model";
import {cloneDeep} from "lodash";
import Input from "../../input/input";
import Alert from "../../alert/alert";

interface Props {
    dishes: DishInterface []
    onOrderClick: (userType: UserType, dishes: DishInterface[]) => void
}

const OrderModal: React.FC<Props> = (props) => {
    const [userTypes, setUserTypes] = useState({
        types: [
            {id: 0, value: "Regular", isChecked: true},
            {id: 1, value: "Member", isChecked: false},
            {id: 2, value: "VIP", isChecked: false}
        ]
    });
    const [dishes, setDishes] = useState<DishInterface[]>(props.dishes.length !== 0 ? cloneDeep(props.dishes) : []);
    const [showAlert, setShowAlert] = useState(false);
    const [msgAlert, setMsgAlert] = useState('');


    useEffect(() => {
        setDishes(props.dishes)
    }, [props.dishes])

    if (props.dishes.length === 0) return null;

    const checkUserType = (event: any) => {
        let types = userTypes.types;
        types.forEach(type => {
            if (type.isChecked) type.isChecked = false;
            if (type.value === event.target.value) type.isChecked = event.target.checked
        })
        setUserTypes({types: types})
    }


    const onClickOrder = () => {
        const typeOfUser = userTypes.types.filter(type => type.isChecked);
        if (!typeOfUser.length) {
            setShowAlert(true)
            setMsgAlert('You didnt choose user type')
            setTimeout(() => {
                setShowAlert(false)
                setMsgAlert('')
            }, 4000);
            return;
        }

        let ing = 0;
        dishes.forEach(d => {
            d.ingredients.forEach(i => {
                if (i.amountInDish > 0) {
                    ing++;
                }
            })
        })
        if (ing === 0) {
            setShowAlert(true)
            setMsgAlert('You didnt choose any ingredient')
            setTimeout(() => {
                setShowAlert(false)
                setMsgAlert('')
            }, 4000);
            return;
        }

        let type: UserType;
        if (typeOfUser[0].value === 'VIP') type = UserType.vip;
        else if (typeOfUser[0].value === 'Member') type = UserType.member;
        else type = UserType.regular;

        props.onOrderClick(type, [...dishes]);

        setUserTypes({
            types: [
                {id: 0, value: "Regular", isChecked: false},
                {id: 1, value: "Member", isChecked: false},
                {id: 2, value: "VIP", isChecked: false}
            ]
        })
    }

    const updateIngredients = (e: any, ingredient: IngredientInterface): void => {
        const dish = cloneDeep(dishes.find(d => d.id === ingredient.myDishId));
        if (dish === undefined) {
            return;
        }
        const newIngredient = dish.ingredients.find(i => i.title === ingredient.title);
        if (newIngredient === undefined) {
            return;
        }
        const allDishes = [...dishes]
        const dishIndex = allDishes.findIndex(d => d.id === dish.id);
        switch (e.target.value) {
            case '+': {
                newIngredient.amountInDish++;
                dish.price += newIngredient.price;
                dish.duration += newIngredient.duration;
                allDishes.splice(dishIndex, 1, dish);
                setDishes(allDishes);
                return;
            }

            case '-': {
                if (!newIngredient.amountInDish) return;
                newIngredient.amountInDish--;
                dish.price -= newIngredient.price;
                dish.duration -= newIngredient.duration;
                allDishes.splice(dishIndex, 1, dish);
                setDishes(allDishes);
                return;
            }
        }
    }

    const calculateTotalTime = () => {
        let timer = 0, minutes, seconds;
        for (let i = 0; i < dishes.length; i++) {
            timer += dishes[i].duration
        }
        minutes = parseInt(String(timer / 60), 10);
        seconds = parseInt(String(timer % 60), 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return ' ' + minutes + ":" + seconds;
    }

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        for (let i = 0; i < dishes.length; i++) {
            totalPrice += dishes[i].price
        }
        return totalPrice;
    }

    return (
        <div>
            <div className={orderModalStyle.Boxes}>
                <div className={orderModalStyle.OrderSummary}>
                    <div className={orderModalStyle.PriceNdish}>
                        <p>Dish</p> <p>Price</p>
                    </div>
                    {dishes.map((dish: DishInterface, i: number) => (
                        <div className={orderModalStyle.Dish} key={Math.random()}>

                            <input className={orderModalStyle.ToggleBox} id={i.toString()} type="checkbox"/>
                            <label className={orderModalStyle.Label} htmlFor={i.toString()}>
                                <p className={orderModalStyle.DishTitle}>{dish.title}</p>
                            </label>
                            <div className={orderModalStyle.Ingredients}>
                                {dish.ingredients.map((i: IngredientInterface) => {
                                    return (
                                        <div key={Math.random()} className={orderModalStyle.Ingredient}>
                                            <p>{i.title}</p>
                                            <Input ingredient={i} onClickInput={updateIngredients}/>
                                        </div>
                                    )
                                })}
                            </div>
                            <span className={orderModalStyle.DishPrice}> {dish.price}&#36;</span>
                        </div>
                    ))}

                    <div className={orderModalStyle.TotalPrice}>
                        <p>Total Price:</p>
                        <p>{calculateTotalPrice()}&#36;</p>
                    </div>
                </div>

                <div className={orderModalStyle.OrderSummary}>
                    <div className={orderModalStyle.typesNtime}>
                        <p className={orderModalStyle.type}>Customer type:</p>

                        <ul className={orderModalStyle.CheckBox}>
                            {
                                userTypes.types.map((type) => {
                                    return (<CheckBox key={Math.random()}
                                                      checkUserType={checkUserType}  {...type} />)
                                })}
                        </ul>

                        <div className={orderModalStyle.Duration}>
                            <p>Duration:
                                <span>
                                    {calculateTotalTime()}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div onClick={onClickOrder} style={{marginBottom: '10px'}}>
                <Button text='Order'/>
            </div>
            <div className={orderModalStyle.Alert}>
                <Alert msg={msgAlert} type='danger' show={showAlert}/>
            </div>
        </div>
    )
}

export default OrderModal;