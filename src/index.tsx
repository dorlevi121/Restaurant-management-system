import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
//redux
import {createStore} from "redux";
import {Provider} from 'react-redux';
import {rootReducer} from "./store";


export const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><BrowserRouter> <App/> </BrowserRouter></Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
