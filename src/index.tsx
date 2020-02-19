import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//redux
import {createStore} from "redux";
import {Provider} from 'react-redux';
//import dashboardReducer from './store/Dashboard/reducers/DashboardReducer';

//const store = createStore(dashboardReducer);

ReactDOM.render( <App /> , document.getElementById('root'));
serviceWorker.unregister();
