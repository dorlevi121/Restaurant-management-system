import React, {Component} from 'react';
import kitchenStyle from './kitchen.module.scss';
import {DishInterface} from "../../../../models/system/dish.model";
import {IngredientInterface} from "../../../../models/system/ingredients.model";


interface Props {
    dishesList: DishInterface[],
}
let interval:any;

class Kitchen extends Component <Props> {
    constructor(props: any) {
        super(props);
    }

    state = {
        time: 0,
    }

    time = (dish: DishInterface, i: number) => {
        const t = dish.duration - (Math.abs((dish.kitchenEntryTime - Date.now()))/1000);
        let timer = Math.floor(t), minutes, seconds;
        minutes = parseInt(String(timer / 60), 10);
        seconds = parseInt(String(timer % 60), 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if(timer < 0) return;
        //dish.finishTime = timer+1;
        return minutes + ":" + seconds ;

    }

    componentDidMount() {
        if(this.props.dishesList.length > 0)
            interval =setInterval(() => this.setState({time: this.state.time+1}), 1000);
    }

    componentWillUnmount() {
        clearInterval(interval);
    }


    render() {
        return (
            <div className={kitchenStyle.KitchenModule}>
                {this.props.dishesList.map((dish: DishInterface, i:number) => {

                    return (
                        <div key={Math.random()} className={kitchenStyle.Stand}>
                            {i%2===0? <br/> : null}
                            <div className={kitchenStyle.DishHeader}>
                                <p>Title: {dish.title} <span> Order ID: {dish.orderId}</span></p>
                            </div>
                            <div className={kitchenStyle.Ingredients}>
                                {dish.ingredients.map((i: IngredientInterface) => {
                                    return (
                                        <div key={Math.random()} className={kitchenStyle.Ingredient}>
                                            <img src={i.image} alt={i.title}/>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={kitchenStyle.Time}>
                                <p>Time:  {this.time(dish, i)}</p>
                            </div>
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