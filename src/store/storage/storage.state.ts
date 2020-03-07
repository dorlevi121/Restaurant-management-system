import {StorageState} from "./storage.types";
import {initialBudget, initialIngredientsQuantity} from "../../config/config";

export const initialStorageState: StorageState = {
    ingredientsQuantity: initialIngredientsQuantity,
    budget: initialBudget
}