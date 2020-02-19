import React, {Component} from "react";
import dashboardStyle from './Dashboard.module.scss';
import {numberOfDashboards} from '../../core/config';

class Dashboard extends Component {

    render() {
        return (
            <div className={dashboardStyle.dashboard}>
                <div className={dashboardStyle.dashboard_queues}>
                    <div className={dashboardStyle.dashboard_queues_queue}>
                        <div className={dashboardStyle.dashboard_queues_queue_dish}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;