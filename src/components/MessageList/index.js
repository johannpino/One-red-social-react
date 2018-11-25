import React, { Component } from 'react';
import Message from '../Message'
import './message-list.css'

class MessageList extends Component {
    render() {
        return (
            <div className="root-message-list">
                {this.props.messages.map(msg =>{
                    return(
                        <Message 
                            key={msg.id}
                            text={msg.text}
                            picture={msg.picture}
                            displayName={msg.displayName}
                            username={msg.username}
                            date={msg.date}
                            numRetweets={msg.retweets}
                            numFavorite={msg.favorites}
                            onRetweet={() => this.props.onRetweet(msg.id)}
                            onFavorite={() => this.props.onFavorite(msg.id)}
                            onReplyTweet={() => this.props.onReplyTweet(msg.id, msg.username)}
                        />
                    )
                }).reverse()}
            </div>
        );
    }
}

export default MessageList;