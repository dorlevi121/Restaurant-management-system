import React from "react";
import dishStyle from './Dish.module.scss';

interface Props {
    name: string
    ingredients: string[],
    image: any,
    time: number
}

const Dish: React.FC<Props> = (props) => {

    return (
            <div className={dishStyle.dish}>
                <div>
                    <img src={props.image} alt={props.name}/>
                </div>
                <div className={dishStyle.dish_content}>
                    {props.ingredients.map(ing => {
                        return (<p>{ing}</p>)
                    })}
                </div>
            </div>


    );
}

export default Dish;