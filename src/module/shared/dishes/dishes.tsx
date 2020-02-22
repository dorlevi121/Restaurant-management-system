import React, {useState} from "react";
import menu from '../../../assets/dishes/allDishes';
import dishesStyle from './Dishes.module.scss';
import DishComponent from "./dish/dish.component";
import {Dish} from "../../../models/system/dish.model";

interface Props {
    addToQueue: (id: number) => void
}

const Dishes: React.FC<Props> = (props) => {
    const [countImg, setCountImg] = useState(0);

    const dishes = menu.map((dish:Dish, index:number) => {
        return (<DishComponent key={dish.id} dish={dish} addToQueue={props.addToQueue}/>)
    });

    return (
        <div className={dishesStyle.Dishes}>
            <p className={dishesStyle.Arrow} onClick={() => setCountImg(countImg + 1)}>&#10094;</p>
            {dishes[countImg]}
            <p className={dishesStyle.Arrow} onClick={() => setCountImg(countImg - 1)}>&#x276f;</p>
        </div>
    )
}

export default Dishes;