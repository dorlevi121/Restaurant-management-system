import React from "react";
import { Route, Switch } from "react-router";

import Order from "./module/order/container/order";
import Dashboard from "./module/dashboard/container/dashboard";
import Storage from "./module/storage/storage";
import Home from "./module/home/home";

export const routing: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/order" component={Order} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/storage" component={Storage} />
  </Switch>
);

export default routing;
