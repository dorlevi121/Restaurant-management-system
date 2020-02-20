import React, {Component} from "react";
import dashboardStyle from './Dashboard.module.scss';
import {connect} from "react-redux";

import {DashboardState} from "../../../store/Dashboard/dashboard.types";
import {ordersInQueue} from "../../../store/Dashboard/dashboard.selectors";
import * as dispatchStore from "../../../store/Dashboard/dashboard.dispatch";
import {OrderState} from "../../../store/Order/order.types";

interface Props {
    order: OrderState
}

class Dashboard extends Component<Props> {

    render() {
        return (
            // <div className={dashboardStyle.Dashboard}>
            //     <div className={dashboardStyle.DashboardQueues}>
            //         <div className={dashboardStyle.DashboardQueuesQueue}>
            //             <div className={dashboardStyle.DashboardQueuesQueueDish}>
            //                { this.props.order}
            //             </div>
            //         </div>
            //     </div>
            // </div>
            <div>
                { this.props.order.id}
            </div>
        );
    }
}

const mapStateToProps = (state: DashboardState) => {
    return {
        ordersInQueue: ordersInQueue(state)
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addOrderToQueue: (order:OrderState) => dispatchStore.addOrderToQueue(order, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);