import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import StarRating from './StarRating.jsx';

import { browserHistory, Link, hashHistory, Router, Route, IndexRoute } from 'react-router'

class FilmList extends React.Component {
    //var hashHistory = ReactRouter.hashHistory;

constructor(props) {
        super(props);
       var films = this.props["films"];
        this.filmNodes = [];
        for (var i = 0; i < films.length; i++ ){
          var currentFilm = films[i];
          this.filmNodes.push( 

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
            <div className="films_list_block">


              {this.filmNodes}


            </div>

        );
    }
}

export default FilmList;
