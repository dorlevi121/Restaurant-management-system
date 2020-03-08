import React from "react";
import {OrderInterface} from "../../../system/order.model";
import queueModalStyle from './modal-dashboard.module.scss';
import Button from "../../button/button";
import {DishInterface} from "../../../system/dish.model";


interface Props {
    order: OrderInterface | null,
    onCancelClick: (orderId: string | null) => void
}

const DashboardModal: React.FC<Props> = (props) => {
    if (props.order === null) return null;
    return (
        <div className={queueModalStyle.Main}>
            <div className={queueModalStyle.Content}>
                <p><span style={{fontWeight: 600}}>Order id:</span> {props.order.id}</p>
                <ul className={queueModalStyle.Dishes}> Dishes:
                    {props.order?.dish.map((dish: DishInterface) => (
                        <li className={queueModalStyle.Dish}>{dish.title}</li>
                    ))}
                </ul>
            </div>
            <p><span style={{fontWeight: 600}}>Price:</span> {props.order?.price} &#36;</p>
            <div className={queueModalStyle.Button}
                 onClick={() => props.onCancelClick(props.order !== null ? props.order.id : null)}>
                <Button text='cancel order'/>
            </div>
        </div>
    )
}

export default DashboardModal;