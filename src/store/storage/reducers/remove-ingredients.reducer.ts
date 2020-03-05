import { removeIngredientsActionType, StorageState} from "../storage.types";
import {cloneDeep} from "lodash";


export const removeIngredients = (action: removeIngredientsActionType, state: StorageState) => {
    const ingredientsDictionary = cloneDeep(state.ingredientsQuantity);
    action.ingredients.forEach(i => {
        ingredientsDictionary[i.title] -= i.amountInDish;
    })
    return {...state, ingredientsQuantity: ingredientsDictionary}
}

