import React, { Component } from 'react';
import moment from 'moment'
import './message.css'
import Link from 'react-router-dom/Link';

class Message extends Component {
    constructor(){
        super()
        this.state = {
            pressFavorite: false,
            pressRetweet: false
        }
    }

    onPressRetweet(){
        this.props.onRetweet()
        this.setState({
            pressRetweet: true
        })
    }

    onPressFavorite(){
        this.props.onFavorite()
        this.setState({
            pressFavorite: true
        })
    }



    render() {
        let dateFormat = moment(this.props.date).fromNow()
        let userLink = `/user/${this.props.username}`
        return (
           <div className="root-user">
            <div className="user">
                <Link to={userLink}>
                    <figure>
                        <img className="avatar" src={this.props.picture} alt={this.props.username} />
                    </figure>
                </Link>
                
                <span className="displayName">{this.props.displayName}</span>
                <span className="username">{this.props.username}</span>
                <span className="date">{dateFormat}</span>
            </div>
            <h3>{this.props.text}</h3>
            <div className="buttons">
                <div className="icon" onClick={this.props.onReplyTweet} >
                    <span className="fa fa-reply"></span>
                </div>
                <div className={(this.state.pressRetweet) ? 'rtGreen' : 'icon'} onClick={this.onPressRetweet.bind(this)} >
                    <span className="fa fa-retweet"></span>
                    <span className="num">{this.props.numRetweets}</span>
                </div>
                <div className={(this.state.pressFavorite) ? 'favYellow' : 'icon'} onClick={this.onPressFavorite.bind(this)} >
                    <span className="fa fa-star"></span>
                    <span className="num">{this.props.numFavorite}</span>
                </div>
            </div>
        </div>
    );
    }
}

export default Message;
