import React, {Component} from 'react';
import dishesStyle from './dishes.module.scss';
import menu from "../../../../assets/dishes/allDishes";
import {DishType} from "../../../../models/system/dish.model";
import DishComponent from "../dish/dish.component";
import Button from "../../../../models/UI/button/button";

interface Props {
    addNewDish: (dishId:number) => void
}

class Dishes extends Component <Props> {
    state = {
        clickCounter: 0
    }

    //arrow button to next dish
    nextDish = () => {
        if (this.state.clickCounter === menu.length - 1)
            this.setState({clickCounter: 0})
        else
            this.setState({clickCounter: this.state.clickCounter + 1})
    }

    //all the dishes
    dishes = menu.map((dish: DishType, index: number) => (<DishComponent key={dish.id} dish={dish}/>));

    render() {
        return (
            <div>
                <div className={dishesStyle.Dishes}>
                    <p className={dishesStyle.Arrow} onClick={this.nextDish}>&#10094;</p>
                    {this.dishes[this.state.clickCounter]}
                    <p className={dishesStyle.Arrow} onClick={this.nextDish}>&#x276f;</p>
                </div>

                <div onClick={() => this.props.addNewDish(this.state.clickCounter)}>
                    <Button text='Add to cart'/>
                </div>
             </div>
        )
    }
}

export default Dishes;