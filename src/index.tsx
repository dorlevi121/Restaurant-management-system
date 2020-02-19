import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
//redux
import {createStore} from "redux";
import {Provider} from 'react-redux';
import dashboard from './store/Dashboard/reducer/dashboard.reducer';

//const store = createStore(dashboard);

ReactDOM.render( <BrowserRouter> <App/></BrowserRouter>
    , document.getElementById('root'));
serviceWorker.unregister();
