import React from "react";
import dishStyle from './Dish.module.scss';
import {Dish} from "../../../../models/system/dish.model";

interface Props {
    dish: Dish
    addToQueue: (id: number) => void
}

const DishComponent: React.FC<Props> = (props) => {

    return (
        <div className={dishStyle.dish}>
            <div>
                <img onClick={() => props.addToQueue(props.dish.id)} src={props.dish.image}
                     alt={props.dish.title}/>
            </div>
            <div className={dishStyle.dish_content}>
                {props.dish.ingredients.map((ing, index) => {
                    return (<p key={index}>{ing}</p>)
                })}
            </div>
        </div>


    );
}

export default DishComponent;