import {Dish} from "../../models/system/dish.model";

export interface OrderState  {
    id: number,
    userType: string,
    dish: Dish | null
}