import React, {Component} from "react";
import dashboardStyle from './Dashboard.module.scss';
import {numberOfDashboards} from '../../../config/config';

class Dashboard extends Component {

    render() {
        return (
            <div className={dashboardStyle.Dashboard}>
                <div className={dashboardStyle.DashboardQueues}>
                    <div className={dashboardStyle.DashboardQueuesQueue}>
                        <div className={dashboardStyle.DashboardQueuesQueueDish}>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;