import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';

import { browserHistory, Link, hashHistory, Router, Route, IndexRoute } from 'react-router'

class App extends React.Component {
    //var hashHistory = ReactRouter.hashHistory;
    render() {

        return (
            <div>
              <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
    <link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
    <link href="css/style.css" type="text/css" rel="stylesheet" media="screen,projection"/>
        <nav className="white" role="navigation">
        <div className="nav-wrapper container">
            <a id="logo-container" href="#" className="brand-logo">STARLABS</a>
            <ul className="right hide-on-med-and-down">
                <li><a href="#/lab1">Lab1</a></li>
                <li><a href="#/lab2">Lab2</a></li>
                <li><a href="#/lab3">Lab3</a></li>
            </ul>
            <ul id="nav-mobile" className="side-nav">
                <li><a href="#/lab1">Lab1</a></li>
                <li><a href="#/lab2">Lab2</a></li>
            </ul>
            <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
        </div>
    </nav>
    <main className="container min-height">
        <div>
        {this.props.children}
    </div>
    </main>
    <footer className="page-footer teal">
        <div className="container">
            <div className="row">
                <div className="col l6 s12">
                    <h5 className="white-text">VNTU</h5>
                    <p className="grey-text text-lighten-4">:-(</p>
                </div>
            </div>
        </div>
        <div className="footer-copyright">
            <div className="container">
                Made by <a className="brown-text text-lighten-3" href="http://materializecss.com">Materialize</a>
            </div>
        </div>
    </footer>
     <script src="js/materialize.js"></script>
</div>

        );
    }
}

export default App;
