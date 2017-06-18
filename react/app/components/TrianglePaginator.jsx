import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';


import { browserHistory, Link, hashHistory, Router, Route, IndexRoute } from 'react-router'

class TrianglePaginator extends React.Component {
    //var hashHistory = ReactRouter.hashHistory;

constructor(props) {
        super(props);
       var currentPage = this.props["current-page"];
       var totalPages = this.props["total-pages"];
        this.starNodes = [];
        for (var i = 0; i < totalPages; i++ ){
          var isCurrent = (currentPage-1) == i;
          var extraClass = isCurrent ? "selected" : "";
          this.starNodes.push( <div key={i} className={"paginator_item "+extraClass}><span>{i+1}</span></div>);
        }

    }

    render() {
        return (
            <div className="paginator_area">


              {this.starNodes}


            </div>

        );
    }
}

export default TrianglePaginator;
