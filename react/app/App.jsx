import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';


import { browserHistory, Link, hashHistory, Router, Route, IndexRoute } from 'react-router'

class App extends React.Component {
    //var hashHistory = ReactRouter.hashHistory;

constructor(props) {
        super(props);

        // set data

    }

    render() {
        return (
            <div>
           <nav className="navbar navbar-inverse">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="#">Курсова робота</a>
    </div>
    <ul className="nav navbar-nav">
      <li className="active"><a href="#">Home</a></li>
      <li><a href="#/lab1">Модуль 1</a></li>
      <li><a href="#/lab2">Модуль 2</a></li>
      <li><a href="#/lab3">Модуль 3</a></li>
    </ul>
  </div>
</nav>
    <main className="min-height">
        <div>
        {this.props.children}
    </div>
    </main>
</div>

        );
    }
}

export default App;
