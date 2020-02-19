import {OrderState} from "./order.types";

export const ordersId= (state:OrderState) => state.id;
export const userType= (state:OrderState) => state.userType;
export const dish= (state:OrderState) => state.dish;