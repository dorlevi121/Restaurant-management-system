import React from 'react';
import kitchenStyle from './kitchen.module.scss';

import {OrderState} from '../../../../store/orders/order.types';
import {Dispatch} from "redux";
import {connect, ConnectedProps} from "react-redux";
import order from "../../../order/container/order";


interface Props {
    QueueToKitchen: OrderState[]
}

const Kitchen:React.FC = (props) => {
    // console.log(props.addOrderToKitchen(props.getOrdersPriority[0]))
    // console.log('order kitchen' + props.getOrdersFromKitchen[0])

    return (
        <div className={kitchenStyle.Kitchen}>

        </div>
    );
}



export default (Kitchen);