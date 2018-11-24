import React, { Component } from 'react';
import Message from '../Message'
import './message-list.css'

class MessageList extends Component {
    render() {
        return (
            <div className="root-message-list">
                {this.props.messages.map((msg,i) =>{
                    return(
                        <Message 
                            key={i}
                            text={msg.text}
                            picture={msg.picture}
                            displayName={msg.displayName}
                            username={msg.username}
                            date={msg.date}
                            numRetweets={msg.retweets}
                            numFavorite={msg.favorites}
                            onRetweet={() => this.props.onRetweet(msg.i).bind(this)}
                            onFavorite={() => this.props.onFavorite(msg.i).bind(this)}
                        />
                    )
                }).reverse()}
            </div>
        );
    }
}

export default MessageList;