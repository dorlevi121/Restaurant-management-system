import React from 'react';
import kitchenStyle from './kitchen.module.scss';

import {OrderState} from '../../../../store/Order/order.types';
import {Dispatch} from "redux";
import {DashboardState} from "../../../../store/Dashboard/dashboard.types";
import {getOrdersInKitchen, getOrdersPriority} from "../../../../store/Dashboard/dashboard.selectors";
import {addOrderToKitchen, RemoveOrderFromKitchen} from "../../../../store/Dashboard/dashboard.dispatch";
import {connect, ConnectedProps} from "react-redux";
import order from "../../../order/container/order";


interface Props {
    QueueToKitchen: OrderState[]
}

const Kitchen:React.FC <PropsFromRedux>= (props) => {
    // console.log(props.addOrderToKitchen(props.getOrdersPriority[0]))
    // console.log('order kitchen' + props.getOrdersFromKitchen[0])
    return (
        <div className={kitchenStyle.Kitchen}>

        </div>
    );
}

const mapStateToProps = (state: DashboardState) => {
    return {
        getOrdersPriority: getOrdersPriority(state),
        getOrdersFromKitchen: getOrdersInKitchen(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addOrderToKitchen: (order: OrderState) => addOrderToKitchen(order, dispatch),
        removeOrderFromKitchen: (order: OrderState) => RemoveOrderFromKitchen(order, dispatch)
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Kitchen);