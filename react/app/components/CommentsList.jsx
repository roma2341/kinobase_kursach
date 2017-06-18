import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';


import { browserHistory, Link, hashHistory, Router, Route, IndexRoute } from 'react-router'

class CommentsList extends React.Component {
    //var hashHistory = ReactRouter.hashHistory;

constructor(props) {
        super(props);
       var comments = this.props["comments"];
        this.starNodes = [];
        for (var i = 0; i < comments.length; i++ ){
          var currentComment = comments[i];
          var extraClass = currentComment.isFirstLevel ? "" : "second_level";
          this.starNodes.push( 

            <div key={i} className={"user_comment "+extraClass}>
            <div className="user_avatar">
                <img src={"assets/images/"+currentComment.avatar} alt=""/>
                <div className="response_link">Ответить</div>
            </div>
            <div className="comment_body">
                <div className="title">
                    <div className="user_name">{currentComment.userName}</div>
                    <div className="comment_date">{currentComment.commentDate}</div>
                </div>
                <div className="comment_text">
               {currentComment.commentText}
                </div>

            </div>
        </div>

            );
        }

    }

    render() {
        return (
            <div className="comments_area">


              {this.starNodes}


            </div>

        );
    }
}

export default CommentsList;
