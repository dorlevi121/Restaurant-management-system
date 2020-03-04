import React, {Component} from 'react';
import DeliveryStyle from './delivery.module.scss';
import {OrderInterface} from "../../../../models/system/order.model";
import deliveryIcon from '../../../../assets/delivery-icon/delivery-icon.png';
import {DishInterface} from "../../../../models/system/dish.model";
import {deliveryTime} from "../../../../config/config";

interface OwnProps {
    ordersIdDelivery: OrderInterface[]
}
let interval: any;

class Delivery extends Component <OwnProps> {

    state = {
        time: 0
    }

    time = (order: OrderInterface) => {
        if (order.deliveryEntryTime === undefined){
            return;
        }
        console.log('s')
        const t = deliveryTime - (Math.abs((order.deliveryEntryTime - Date.now())) / 1000);
        let timer = Math.floor(t), minutes, seconds;
        minutes = parseInt(String(timer / 60), 10);
        seconds = parseInt(String(timer % 60), 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (timer < 0) return;
        return minutes + ":" + seconds;

    }


    componentDidMount() {
        console.log(this.props.ordersIdDelivery.length)
        if (this.props.ordersIdDelivery.length > 0)
            interval = setInterval(() => this.setState({time: this.state.time + 1}), 1000);
    }

    componentWillUnmount() {
        clearInterval(interval);
    }

    render() {
        console.log('re')
        return (
            <div className={DeliveryStyle.DeliveryModule}>
                {this.props.ordersIdDelivery.map((order: OrderInterface, i: number) => {
                    return (
                        <div key={Math.random()} className={DeliveryStyle.Position}>
                            <div className={DeliveryStyle.Content}>
                                <p>Order Id: {order.id}</p>
                                <p>Time: {this.time(order)}</p>
                            </div>
                            <div className={DeliveryStyle.Icon}>
                                <img src={deliveryIcon} alt="delivery"/>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Delivery;