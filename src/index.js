import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Qiandao from './page/qiandao/index';
import WebList from './page/webList/index';
// import XsyJianLi from './page/xsyJianLi/index';
// import DqJianLi from './page/dqJianLi/index';
import {HashRouter, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <HashRouter>
        <Route exact path="/" component={ App } />
        <Route path="/qiandao" component={ Qiandao } />
        <Route path="/webList" component={ WebList } />
    </HashRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
