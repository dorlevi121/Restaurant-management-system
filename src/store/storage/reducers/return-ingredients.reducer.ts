import {returnIngredientsActionType, StorageState} from "../storage.types";
import {cloneDeep} from "lodash";


export const returnIngredients = (action: returnIngredientsActionType, state: StorageState) => {
    const ingredientsDictionary = cloneDeep(state.ingredientsQuantity);
    action.ingredients.forEach(i => {
        ingredientsDictionary[i.title] += i.amountInDish;
    })
    return {...state, ingredientsQuantity: ingredientsDictionary}
}

