import React, {useState} from "react";
import {DishInterface} from "../../../system/dish.model";
import CheckBox from "../../chackbox/checkbox";
import Button from "../../button/button";
import {UserType} from "../../../system/user-type.enum";
import orderModalStyle from './modal-order.module.scss';

interface Props {
    dishes: DishInterface []
    onOrderClick: (userType: UserType, dishes: DishInterface[]) => void
}

const OrderModal: React.FC<Props> = (props) => {
    const [userTypes, setUserTypes] = useState({
        types: [
            {id: 0, value: "Regular", isChecked: false},
            {id: 1, value: "Member", isChecked: false},
            {id: 2, value: "VIP", isChecked: false}
        ]
    });

    if (props.dishes.length === 0) return null ;

    const handleCheckChildElement = (event: any) => {
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
            return
        };

        let type: UserType;
        if (typeOfUser[0].value === 'VIP') type = UserType.vip;
        else if (typeOfUser[0].value === 'Member') type = UserType.member;
        else type = UserType.regular;

        props.onOrderClick(type, [...props.dishes]);

        setUserTypes({
            types: [
                {id: 0, value: "Regular", isChecked: false},
                {id: 1, value: "Member", isChecked: false},
                {id: 2, value: "VIP", isChecked: false}
            ]
        })
    }

    const calculateTotalTime = () => {
        let timer = 0, minutes, seconds;
        for (let i =0; i< props.dishes.length; i++){
            timer += props.dishes[i].duration
        }
        minutes = parseInt(String(timer / 60), 10);
        seconds = parseInt(String(timer % 60), 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if(timer < 0) return;
        //dish.finishTime = timer+1;
        return ' ' + minutes + ":" + seconds;
    }

    return (
        <div>
            <div className={orderModalStyle.Boxes}>
                <div className={orderModalStyle.OrderSummary}>
                    <div className={orderModalStyle.PriceNdish}>
                        <p>Dish <span>price</span></p>
                    </div>
                    {props.dishes.map((dish: DishInterface) => (
                        <div className={orderModalStyle.Dish} key={Math.random()}>
                            <p className={orderModalStyle.DishTitle}>{dish.title}
                                <span className={orderModalStyle.DishPrice}> {dish.price}&#36;</span></p>
                        </div>
                    ))}

                    <div className={orderModalStyle.PriceNdish}>
                        <p>Total Price: <span style={{marginLeft: '65px'}}>{(props.dishes?.map(d => d.price).reduce((a, b) => a + b))}&#36;</span></p>
                    </div>
                </div>

                <div className={orderModalStyle.OrderSummary}>
                    <div className={orderModalStyle.typesNtime}>
                        <p className={orderModalStyle.type}>Customer type:</p>

                        <ul className={orderModalStyle.CheckBox}>
                            {
                                userTypes.types.map((type) => {
                                    return (<CheckBox key={Math.random()}
                                                      handleCheckChildElement={handleCheckChildElement}  {...type} />)
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
        </div>
    )
}

export default OrderModal;