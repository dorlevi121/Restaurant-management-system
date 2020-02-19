import Order from "../../module/order/container/Order";

export interface DashboardState {
    ordersInQueue: Order[],
    ordersInKitchen: Order[],
    ordersInDelivery: Order[]
}
