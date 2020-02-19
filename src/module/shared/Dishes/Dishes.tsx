import React, {useState} from "react";
import allDishes from '../../../assets/dishes/allDishes';
import dishesStyle from './Dishes.module.scss';
import Dish from "./Dish/Dish";

const Dishes = () => {
    const [countImg, setCountImg] = useState(0);

    const dishes = allDishes.map((dish, index) => {
        return (<Dish name={dish.name} ingredients={dish.Ingredients} image={dish.image} time={dish.time}/>)
    });

    return (
        <div className={dishesStyle.dishes}>
            <p className={dishesStyle.dishes_arrow} onClick={() => setCountImg(countImg + 1)}>&#10094;</p>
            {dishes[countImg]}
            <p className={dishesStyle.dishes_arrow} onClick={() => setCountImg(countImg - 1)}>&#x276f;</p>
        </div>
    )
}

export default Dishes;