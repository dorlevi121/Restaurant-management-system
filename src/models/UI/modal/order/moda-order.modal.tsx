import React, {useState} from "react";
import modalStyle from "../modal.module.scss";
import {DishType} from "../../../system/dish.model";
import CheckBox from "../../chackbox/checkbox";
import Button from "../../button/button";
import {OrderType} from "../../../system/order.model";
import {UserType} from "../../../system/user-type.model";

interface Props {
    order: OrderType | null,
    onOrderClick: (order: OrderType) => void
}

const OrderModal:React.FC <Props> = (props) => {

    const [userTypes, setUserTypes] = useState({
        types: [
            {id: 0, value: "Regular", isChecked: false},
            {id: 1, value: "Member", isChecked: false},
            {id: 2, value: "VIP", isChecked: false}
        ]
    });
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
        if(typeOfUser.length === 0) return;

        let type: UserType;
        let finalOrder: OrderType;

        if (typeOfUser[0].value === 'VIP') type = UserType.vip;
        else if (typeOfUser[0].value === 'Member') type = UserType.member;
        else type = UserType.regular;

        if (props.order !== null) {
            finalOrder = {
                dish: [...props.order?.dish],
                id: props.order?.id,
                totalTime: props.order?.totalTime,
                price: props.order?.price,
                userType: type,
                status: props.order?.status
            }
            props.onOrderClick(finalOrder);
        }
        setUserTypes({
            types: [
                {id: 0, value: "Regular", isChecked: false},
                {id: 1, value: "Member", isChecked: false},
                {id: 2, value: "VIP", isChecked: false}
            ]
        })
    }

    return(
    <div>
        <div className={modalStyle.Boxes}>
            <div className={modalStyle.OrderSummary}>
                <div className={modalStyle.PriceNdish}>
                    <p>Dish <span>price</span></p>
                </div>
                {props.order?.dish.map((dish: DishType) => (
                    <div className={modalStyle.Dish} key={Math.random()}>
                        <p className={modalStyle.DishTitle}>{dish.title}
                            <span className={modalStyle.DishPrice}> {dish.price}&#36;</span></p>
                    </div>
                ))}

                <div className={modalStyle.PriceNdish}>
                    <p>Total Price: <span style={{marginLeft: '65px'}}>{props.order?.price}&#36;</span></p>
                </div>
            </div>

            <div className={modalStyle.OrderSummary}>
                <div className={modalStyle.typesNtime}>
                    <p className={modalStyle.type}>Customer type:</p>

                    <ul className={modalStyle.CheckBox}>
                        {
                            userTypes.types.map((type) => {
                                return (<CheckBox key={Math.random()}
                                                  handleCheckChildElement={handleCheckChildElement}  {...type} />)
                            })}
                    </ul>

                    <div className={modalStyle.Duration}>
                        <p>Duration: <span> {props.order !== null ? (props.order.totalTime / 60).toFixed(1) : null}</span>
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