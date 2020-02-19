import React from 'react';
import appStyles from './App.module.scss';
import logo from './assets/logo/logo.png';
import {Route, Switch} from "react-router";

import Order from './module/Order/container/Order';
import Dashboard from './module/Dashboard/container/Dashboard';


function App() {
    return (
        <div className={appStyles.app}>
            {/*Header*/}
            <div className={appStyles.header}>

                <div className={appStyles.header_logo}>
                    <img src={logo} alt="Logo"/>
                </div>

                <div className={appStyles.header_pageName}>Name Page</div>
            </div>

            {/*Body*/}
            <div className={appStyles.appBody}>
                {/*Navigation*/}
                <div className={appStyles.appBody_navigation}>
                    <div className={appStyles.appBody_navigation_item}>1</div>
                    <div className={appStyles.appBody_navigation_item}>2</div>
                    <div className={appStyles.appBody_navigation_item}>3</div>
                    <div className={appStyles.appBody_navigation_item}>4</div>
                </div>

                <div className={appStyles.appBody_mainContent}>
                    <Order/>
                </div>
            </div>

            {/*<Switch>*/}
            {/*    <Route path='/' component={Order}/>*/}
            {/*</Switch>*/}
        </div>
    );
}

export default App;
