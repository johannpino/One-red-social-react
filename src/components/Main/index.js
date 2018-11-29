import React, { Component } from 'react'
import uuid from 'uuid'
import MessageList from '../MessageList'
import InputText from '../InputText'
import ProfileBar from '../ProfileBar'
import firebase from '../../initializers/firebase'
import {connect} from 'react-redux';
import { onpenInputText, 
        closeInputText, 
        userNameToReply,
        clearUserNameToReply, 
        addMessages, 
        userRetweetFavorite, 
        addRetweets,
        addFavorites,
        addMessagesRetweets,
        addMessagesFavorites
} from '../../redux/actions';

class Main extends Component {

    componentDidMount() {
        const messagesRef = firebase.database().ref().child('messages')
        messagesRef.on('child_added', snapshot => {
            this.props.addMessages(snapshot.val())
        })
        this.props.userRetweetFavorite()     
    }
    

    handleOpenText(e){
        e.preventDefault()
        this.props.onpenInputText(true)
        this.props.clearUserNameToReply()
    }

    handleSendText(e){
        e.preventDefault()
        let newMessage = {
            id: uuid.v4() ,
            username: this.props.user.email.split('@')[0],
            displayName: this.props.user.displayName,
            picture: this.props.user.photoURL,
            date: Date.now(),
            text: e.target.text.value,
            retweets: 0,
            favorites: 0
        }

        const messagesRef = firebase.database().ref().child('messages')
        const messagesID = messagesRef.push()
        
        messagesID.set(newMessage)
    }

    handleCloseText(e){
        e.preventDefault()
        this.props.closeInputText()
    }

    renderOpenText(){
        if(this.props.OpenText){
            return (
                <InputText 
                    onSendText={this.handleSendText.bind(this)} 
                    onCloseText={this.handleCloseText.bind(this)}
                    usernameToReply={this.props.usernameToReply}
            />
            )
        }
    }

    handleRetweet(msgId){
        let alreadyRetweet = this.props.user.retweets.filter(rt => rt === msgId)
        if(alreadyRetweet.length === 0){
            let messages = this.props.messages.map(msg => {
                if(msg.id === msgId){
                    msg.retweets++
                }
                return msg
            })

            let user = Object.assign({}, this.props.user)
            user.retweets.push(msgId)

            this.props.addMessagesRetweets(messages)
            this.props.addRetweets(user)
            
        }
        
    }

    handleFavorite(msgId){
        let alreadyFavorited = this.props.user.favorites.filter(fav => fav === msgId )
        if(alreadyFavorited.length === 0){
            let messages = this.props.messages.map(msg => {
                if(msg.id === msgId){
                    msg.favorites++
                }
                return msg
            })
            let user = Object.assign({}, this.props.user)
            user.favorites.push(msgId)

            this.props.addMessagesFavorites(messages)
            this.props.addFavorites(user)
        }
    }

    handleReplyTweet = (msgId, usernameToReply) => {
        this.props.onpenInputText(true)
        this.props.userNameToReply(usernameToReply)
    }


    render() {
        return (
            <div>
                <ProfileBar 
                    picture={this.props.user.photoURL}
                    username={this.props.user.email.split('@')[0]}
                    onOpenText={this.handleOpenText.bind(this)}
                    onLogout={this.props.onLogout}
                />
                {
                    this.renderOpenText()
                    
                }
                <MessageList messages={this.props.messages} 
                            onRetweet={this.handleRetweet.bind(this)} 
                            onFavorite={this.handleFavorite.bind(this)} 
                            onReplyTweet={this.handleReplyTweet}
                />
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {    
    return {
        user: state.user,
        OpenText: state.OpenText,
        usernameToReply: state.usernameToReply,
        messages: state.messages
    }
}

const mapDispatchToProps = dispatch => (
    {
        onpenInputText: value => dispatch(onpenInputText(value)),
        closeInputText: () => dispatch(closeInputText()),
        userNameToReply: value => dispatch(userNameToReply(value)),
        clearUserNameToReply: () => dispatch(clearUserNameToReply()),
        addMessages: value => dispatch(addMessages(value)),
        userRetweetFavorite: () => dispatch(userRetweetFavorite()),
        addRetweets: value => dispatch(addRetweets(value)),
        addFavorites: value => dispatch(addFavorites(value)),
        addMessagesRetweets: value => dispatch(addMessagesRetweets(value)),
        addMessagesFavorites: value => dispatch(addMessagesFavorites(value))
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(Main);