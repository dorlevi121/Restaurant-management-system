import React from "react";
import {OrderInterface} from "../../../system/order.model";
import queueModalStyle from './modal-dashboard.module.scss';
import Button from "../../button/button";


interface Props {
    order: OrderInterface | null,
    onCancelClick: (orderId: string|null) => void
}
const DashboardModal:React.FC <Props> = (props) => {
    if (props.order === null) return null;
    return (
        <div>
            <div className={queueModalStyle.Content}>
                {props.order !== null ? props.order.id : null}
            </div>
            {props.order.id}
            <div onClick={()=>props.onCancelClick(props.order!==null? props.order.id:null)}>
                <Button text='cancel order'/>
            </div>
        </div>
    )
}

export default DashboardModal;