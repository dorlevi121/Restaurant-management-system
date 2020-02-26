import {StorageState} from "./storage.types";
import {initialBudget, initialIngredients} from "../../config/config";

export const initialStorageState: StorageState = {
    ingredients: initialIngredients,
    budget: initialBudget
}