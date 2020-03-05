import {refillIngredientsActionType, StorageState} from "../storage.types";
import {cloneDeep} from "lodash";


export const refillIngredients = (action: refillIngredientsActionType, state: StorageState) => {
    const ingredientsDictionary = cloneDeep(state.ingredientsQuantity);
    for (let key in action.ingredients){
        const q = action.ingredients[key] - ingredientsDictionary[key];
        ingredientsDictionary[key] += q;
    }
    return {...state, ingredientsQuantity: ingredientsDictionary}
}

