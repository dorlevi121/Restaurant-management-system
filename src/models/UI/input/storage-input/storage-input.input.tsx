import React from "react";
import InputStyle from '../input.module.scss';

interface OwnProps {
    ingredientAmount: number,
    updateIngredients: (e: any, ingredientTitle: string) => void,
    title: string
}

const StorageInput: React.FC<OwnProps> = (props) => {
    return (
        <div>
            <form method='POST' action='#'>
                <div className={InputStyle.Quantity}>
                    <input onClick={e => props.updateIngredients(e, props.title)}
                           type='button' value='-' className={InputStyle.Minus}/>
                    <input type='text' name='quantity'
                           defaultValue={props.ingredientAmount} className={InputStyle.Qty}/>
                    <input onClick={e => props.updateIngredients(e, props.title)}
                           type='button' value='+' className={InputStyle.Plus}/>
                </div>
            </form>
        </div>
    )
}

export default StorageInput;