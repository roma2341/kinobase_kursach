import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import StarRating from './StarRating.jsx';

import { browserHistory, Link, hashHistory, Router, Route, IndexRoute } from 'react-router'

class FilmInfoBlock extends React.Component {
    //var hashHistory = ReactRouter.hashHistory;

constructor(props) {
        super(props);
       var film = this.props["film"];
       var details = film.details;
        this.nodes = [];
        for (var i = 0; i < details.length; i++ ){
          var detail = details[i];
          this.nodes.push( 

        <div key={i} className="film_item">
                            <div className="item_title">{currentFilm.name}</div>
                            <div className="item_image">
                                <img src={"assets/images/"+currentFilm.picture} alt=""/>
                                <StarRating rating={currentFilm.rating} max-rating={5}/>
                            </div>
                            <div className="bottom_shadow"></div>
                            <div className="item_details">
                                {currentFilm.description}
                            </div>
                            <div className="watch_now">{currentFilm.buttonText}</div>
        </div>

            );
        }

    }

    render() {
        return (
            <div className="film_info_block">


              {this.nodes}


            </div>

        );
    }
}

export default FilmInfoBlock;
