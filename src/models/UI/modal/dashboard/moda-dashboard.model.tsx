import React from "react";
import {OrderType} from "../../../system/order.model";
import queueModalStyle from './modal-dashboard.module.scss';
import Button from "../../button/button";


interface Props {
    order: OrderType | null,
    onCancelClick: (orderId: number|null) => void
}
const DashboardModal:React.FC <Props> = (props) => {

    return (
        <div>
            <div className={queueModalStyle.Content}>
                {props.order !== null ? props.order.id : null}
            </div>
            <div onClick={()=>props.onCancelClick(props.order !== null?props.order.id:null)}>
                <Button text='cancel order'/>
            </div>
        </div>
    )
}

export default DashboardModal;