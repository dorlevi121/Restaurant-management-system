import React from "react";
import InputStyle from './input.module.scss';
import {IngredientInterface} from "../../system/ingredients.model";

interface OwnProps {
    ingredient: IngredientInterface,
    onClickInput: (e: any, i: IngredientInterface) => void
}

const Input: React.FC<OwnProps> = (props) => {

    return (
        <div>
            <form method='POST' action='#'>
                <div className={InputStyle.Quantity}>
                    <input onClick={e => props.onClickInput(e, props.ingredient)}
                           type='button' value='-' className={InputStyle.Minus}/>
                    <input type='text' name='quantity'
                           defaultValue={props.ingredient.amountInDish} className={InputStyle.Qty}/>
                    <input onClick={e => props.onClickInput(e, props.ingredient)}
                           type='button' value='+' className={InputStyle.Plus}/>
                </div>
            </form>
        </div>
    )
}

export default Input;