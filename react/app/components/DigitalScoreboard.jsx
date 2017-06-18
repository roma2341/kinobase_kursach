import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';


import { browserHistory, Link, hashHistory, Router, Route, IndexRoute } from 'react-router'

class DigitalScoreboard extends React.Component {
    //var hashHistory = ReactRouter.hashHistory;

constructor(props) {
        super(props);
                this.starNodes = [];
       var text = this.props["text"];
           for(var i = 0 ; i < text.length; i++) {
            var currentChar = text.charAt(i);
           this.starNodes.push( <div key={i} className="digit_scoreboard">{currentChar}</div>);

    }

    }

    render() {
        return (
            <div className="date_counter">


              {this.starNodes}


            </div>

        );
    }
}

export default DigitalScoreboard;
