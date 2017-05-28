import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import Home from './Home.jsx';
import Lab3 from './Lab3.jsx';
import Lab2 from './Lab2.jsx';
import Lab1 from './Lab1.jsx';
import App from './App.jsx';


import { browserHistory, Link, hashHistory, Router, Route, IndexRoute } from 'react-router'

render
    (
        <Router history={hashHistory}>
      		<Route path='/' component={App} >
            <Route path='lab1' component={Lab1} />
      			<Route path='lab2' component={Lab2} />
      			<Route path='lab3' component={Lab3} />
      			<IndexRoute component={Home}/>
      		</Route>
    	</Router>, document.getElementById('app'));
