import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import StarRating from './StarRating.jsx';

import { browserHistory, Link, hashHistory, Router, Route, IndexRoute } from 'react-router'

class FilmInfoBlock extends React.Component {
    //var hashHistory = ReactRouter.hashHistory;

constructor(props) {
        super(props);
    }

    render() {

        var film = this.props["film"];
       var details = film.details;
       var image = film.image;
        var nodes = [];
        for (var i = 0; i < details.length; i++ ){
          var detail = details[i];

          var subNode;
          switch(typeof detail.description){
            case "string":
            subNode = <span id={'s'+j}> {detail.description} </span>;
            break;
            case "object":
            subNode = [];
            for (var j = 0; j <  detail.description.length; j++){
                var subDetails = detail.description[j];
                subNode.push(
                    <div id={j} className="half_width_block">
                        <div id={0} className="info_section_title">{subDetails.title}</div>
                        <div id={1} className="info_section">{subDetails.description}</div>
                    </div>
                    );
            }
            break;

          }
          nodes.push(

          <div id={detail.title} className="section info_section">
            <div className="section info_section_title">{detail.title}</div>
                    <div className="info_section">{subNode}</div>
                    </div>
                    );
        }




        return (
            <div className="film_info_block">

                <div  className="section film_info_image">
                        <img  src={"assets/images/"+film.image} alt=""/>
                </div>

              {nodes}

              <div id={'fib_03'} className="section"></div>


            </div>

        );
    }
}

export default FilmInfoBlock;
