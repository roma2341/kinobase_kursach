import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import CostumInput from '../less/app.less'


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

<div className="fullscreen-bg">
    <video loop muted autoPlay poster="assets/images/blue_nature_shine.jpg" className="bg__video">
        <source src="assets/video/blue_nature_shine.mp4" type="video/mp4"/>
    </video>
</div>

      <nav className="navbar-inverse">
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
