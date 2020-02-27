import React from "react";
import dishStyle from './Dish.module.scss';
import {DishType} from "../../../../models/system/dish.model";
import Button from "../../../../models/UI/button/button";

interface Props {
    dish: DishType
    addToQueue?: (id: number) => void
}

const DishComponent: React.FC<Props> = (props) => {
    return (
        <div className={dishStyle.Dish}>
            <img  src={props.dish.image} alt={props.dish.title}/>
        </div>
    );
}

export default DishComponent;