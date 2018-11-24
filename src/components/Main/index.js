import React, { Component } from 'react';
import MessageList from '../MessageList'
import InputText from '../InputText'
import ProfileBar from '../ProfileBar'

class Main extends Component {

    constructor(){
        super()
        this.state = {
            OpenText: false,
            messages: [
                {
                    text: "Mensaje de Prueba",
                    picture: "https://pbs.twimg.com/profile_images/1065632042950500353/PjGFZqpF_400x400.jpg",
                    displayName: "Johann Pino",
                    username: "Johannpino",
                    date: Date.now() - 180000,
                    retweets: 0,
                    favorites: 0
                },
                {
                    text: "Nuevo mensaje de Prueba",
                    picture: "https://pbs.twimg.com/profile_images/1065632042950500353/PjGFZqpF_400x400.jpg",
                    displayName: "Johann Pino",
                    username: "Johannpino",
                    date: Date.now() - 260000,
                    retweets: 0,
                    favorites: 0
                }

            ]
        }
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
            username: this.props.user.email.split('@')[0],
            displayName: this.props.user.displayName,
            picture: this.props.user.photoURL,
            date: Date.now(),
            text: e.target.text.value
        }
        console.log(newMessage);
        

        this.setState({
            messages: this.state.messages.concat(newMessage),
            OpenText: false
        })
    }

    handleCloseText(e){
        e.preventDefault()
        console.log('clse');
        this.setState({
            OpenText: false
        })

    }

    renderOpenText(){
        if(this.state.OpenText){
            return <InputText  onSendText={this.handleSendText.bind(this)} onCloseText={this.handleCloseText.bind(this)} />
        }
    }

    handleRetweet(msgId){
        let alreadyRetweet = this.state.user.retweets.filter(rt => rt === msgId)
        if(alreadyRetweet.length === 0){
            let messages = this.state.messages.map((msg, i) => {
                if(msg.i === msgId){
                    msg.retweets++
                }
            })
            return msg
        }
        let user = Object.assign({}, this.state.user)
        user.retweets.push(msgId)

        this.setState({
            messages,
            user
        })
    }

    handleFavorite(msgId){
        let alreadyFavorited = this.state.user.favorites.filter(fav => fav === msgId )
        if(alreadyFavorited.length === 0){
            let messages = this.state.messages.map((msg, i) => {
                if(msg.i === msgId){
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


    render() {
        return (
            <div>
                <ProfileBar 
                    picture={this.props.user.photoURL}
                    username={this.props.user.email.split('@')[0]}
                    onOpenText={this.handleOpenText.bind(this)} />
                {
                    this.renderOpenText()
                    
                }
                <MessageList messages={this.state.messages} onRetweet={this.handleRetweet} onFavorite={this.handleFavorite} />
                
            </div>
        );
    }
}

export default Main;