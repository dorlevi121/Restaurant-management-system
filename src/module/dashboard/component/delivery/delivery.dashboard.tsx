import React from 'react';
import DeliveryStyle from './delivery.module.scss';
import {OrderInterface} from "../../../../models/system/order.model";
import {deliveryTime} from "../../../../config/config";
import Timer from "../../../shared/timer.shared";
import { deliveryImg } from '../../../../constants/images';

interface OwnProps {
    ordersIdDelivery: OrderInterface[]
}

const Delivery: React.FC<OwnProps> = (props) => {
    return (
        <div className={DeliveryStyle.DeliveryModule}>
            {props.ordersIdDelivery.map((order: OrderInterface) => {
                return (
                    <div key={Math.random()} className={DeliveryStyle.Position}>
                        <div className={DeliveryStyle.Content}>
                            <p>Order Id: {order.id}</p>
                            <div className={DeliveryStyle.Time}>
                                <div>
                                    <p>Time:</p>
                                    <Timer
                                        time={deliveryTime - (Math.abs(((order !== undefined ? order.deliveryEntryTime! : 0) - Date.now())) / 1000)}/>
                                </div>
                            </div>
                        </div>
                        <div className={DeliveryStyle.Icon}>
                            <img src={deliveryImg} alt="delivery"/>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}


export default Delivery;