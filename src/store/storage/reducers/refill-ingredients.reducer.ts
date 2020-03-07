import {refillIngredientsActionType, StorageState} from "../storage.types";
import {cloneDeep} from "lodash";
import { initialIngredientsPrice } from "../../../config/config";


export const refillIngredients = (action: refillIngredientsActionType, state: StorageState) => {
    const ingredientsDictionary = cloneDeep(state.ingredientsQuantity);
    let price = 0;
    for (let key in action.ingredients){
        const q = Math.abs(action.ingredients[key] - ingredientsDictionary[key]);
        ingredientsDictionary[key] += q;
        price += (initialIngredientsPrice[key] * q);        
    }
    return {...state, ingredientsQuantity: ingredientsDictionary, budget: state.budget - price}
}

