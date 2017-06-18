import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';


import { browserHistory, Link, hashHistory, Router, Route, IndexRoute } from 'react-router'

class StarRating extends React.Component {
    //var hashHistory = ReactRouter.hashHistory;

constructor(props) {
        super(props);
       var currentRating = this.props["rating"];
       var maxRating = this.props["max-rating"];
        this.starNodes = [];
        for (var i = 0; i < maxRating; i++ ){
          var isChecked = currentRating-1 >= i;
          var extraClass = isChecked ? "checked" : "";
          this.starNodes.push( <div key={i} className={"star "+extraClass}></div>);
        }

    }

    render() {
        return (
            <div className="rating">


              {this.starNodes}


            </div>

        );
    }
}

export default StarRating;
