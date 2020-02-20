import {Route, Switch} from "react-router";
import Home from "./module/shared/Home/Home";
import Dashboard from "./module/dashboard/container/dashboard";
import Storage from "./module/storage/container/Storage";
import React from "react";

export const routing: React.FC = () => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/storage' component={Storage}/>
    </Switch>
)

export default routing;