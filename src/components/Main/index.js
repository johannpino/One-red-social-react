import React, { Component } from 'react'
import uuid from 'uuid'
import MessageList from '../MessageList'
import InputText from '../InputText'
import ProfileBar from '../ProfileBar'
import firebase from '../../initializers/firebase'

class Main extends Component {

    constructor(props){
        super(props)
        this.state = {
            user: Object.assign({}, this.props.user, {retweets:[]}, {favorites:[]}),
            OpenText: false,
            usernameToReply: "",
            messages: []
        }
    }

    componentDidMount() {
        const messagesRef = firebase.database().ref().child('messages')

        messagesRef.on('child_added', snapshot => {
            this.setState({
                messages: this.state.messages.concat(snapshot.val()),
                OpenText: false
            })
        })
    }
    

    handleOpenText(e){
        e.preventDefault()
        console.log('open');
        
        this.setState({
            OpenText: true
        })
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
        console.log('close');
        this.setState({
            OpenText: false
        })

    }

    renderOpenText(){
        if(this.state.OpenText){
            return (
                <InputText 
                    onSendText={this.handleSendText.bind(this)} 
                    onCloseText={this.handleCloseText.bind(this)}
                    usernameToReply={this.state.usernameToReply}
            />
            )
        }
    }

    handleRetweet(msgId){
        let alreadyRetweet = this.state.user.retweets.filter(rt => rt === msgId)
        if(alreadyRetweet.length === 0){
            let messages = this.state.messages.map(msg => {
                if(msg.id === msgId){
                    msg.retweets++
                }
                console.log(msg)
                return msg
            })

            let user = Object.assign({}, this.state.user)
        user.retweets.push(msgId)

        this.setState({
            messages,
            user
        })
        }
        
    }

    handleFavorite(msgId){
        let alreadyFavorited = this.state.user.favorites.filter(fav => fav === msgId )
        if(alreadyFavorited.length === 0){
            let messages = this.state.messages.map(msg => {
                if(msg.id === msgId){
                    msg.favorites++
                }
                return msg
            })
            let user = Object.assign({}, this.state.user)
            user.favorites.push(msgId)

            this.setState({
                messages,
                user
            })
        }
    }

    handleReplyTweet = (msgId, usernameToReply) => {
        this.setState({
            OpenText:true,
            usernameToReply
        })
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
                <MessageList messages={this.state.messages} 
                            onRetweet={this.handleRetweet.bind(this)} 
                            onFavorite={this.handleFavorite.bind(this)} 
                            onReplyTweet={this.handleReplyTweet}
                />
                
            </div>
        );
    }
}

export default Main;