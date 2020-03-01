import React, {Component} from 'react';
import kitchenStyle from './kitchen.module.scss';
import {queueListener} from "../../../../manager/manager-orders";
import {numberOfCookingStands} from "../../../../config/config";
import {OrderType} from "../../../../models/system/order.model";
import {DishType} from "../../../../models/system/dish.model";


interface Props {
    ordersList: { [id: number]: OrderType },
}

class Kitchen extends Component <Props> {
    state = {
        orderInKitchen: queueListener.dishesInKitchen
    }

    mealToKitchen = () => {
        let queues = Array(numberOfCookingStands);
        let count = 0; //Represent queue number
        let indexInArray = 0; //Represent the position in the queue
        for (let i = 0; i < this.state.orderInKitchen.length; i++) {
            const order = this.props.ordersList[this.state.orderInKitchen[i].myOrder];
            const dish = order.dish[this.state.orderInKitchen[i].myDishes[0]];
            queues.push(dish);
        }
        return queues;
    }



    render() {
        return (
            <div className={kitchenStyle.Kitchen}>
                {this.mealToKitchen().map((dish: DishType) => {
                    return (
                        <div key={Math.random()} className={kitchenStyle.Stand}>
                            {dish.title}
                        </div>
                    )
                })}
                <div className={kitchenStyle.Content}>
                    <div className={kitchenStyle.Meal}>
                        <div className={kitchenStyle.DishImg}>
                            <img src="" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default (Kitchen);