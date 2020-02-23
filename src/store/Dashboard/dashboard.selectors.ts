import {DashboardState} from './dashboard.types';
import {initialDashboardState} from "./dashboard.state";

export const getOrdersInKitchen = (state:any) => state.dashboard.ordersInKitchen;
export const  getOrdersPriority = (state: any) => state.dashboard.ordersPriority;
