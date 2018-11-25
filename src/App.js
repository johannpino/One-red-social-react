import React, { Component } from 'react'
import 'normalize-css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Profile from './components/Profile'
import Login from './components/Login';

class App extends Component {

  constructor(){
    super()
    this.state = {
       user: {
        photoURL: "https://pbs.twimg.com/profile_images/1065632042950500353/PjGFZqpF_400x400.jpg",
        email: "johannpino@gmail.com",
        displayName: "Johann Pino",
        location: 'Santiago, Chile'
       }
    }
  }

  renderProfile = () => (
    <Profile
      picture={this.state.user.photoURL}
      username={this.state.user.email.split('@')[0]}
      displayName={this.state.user.displayName}
      location={this.state.user.location}
      emailAddress={this.state.user.email}
    />
  )

  handleOnAuth = () => {
    console.log('clik auth')
  }

  renderHome = () => {
    if(this.state.user){
      return (
        <Main user={this.state.user} />
      )
    }else{
      return (
        <Login onAuth={this.handleOnAuth} />
      )
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={this.renderHome}/>
          <Route exact path="/profile" component={this.renderProfile}/>
          <Switch>
            <Route 
              path="/user/:username" 
              render={({params}) => <Profile {...params} /> }
          />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
