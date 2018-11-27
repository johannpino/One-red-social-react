import React, { Component } from 'react'
import 'normalize-css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Profile from './components/Profile'
import Login from './components/Login';
import firebase from './initializers/firebase'

class App extends Component {

  constructor(){
    super()
    this.state = {
       user:null
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({user})
      }else{
        this.setState({user:null})
      }
    })
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
    const provider = new firebase.auth.GithubAuthProvider()

    firebase.auth().signInWithPopup(provider)
      .then(rs => console.log(`${rs.user.email}ha iniciado sesión` ))
      .catch(error => console.log(error.code, error.message))
  }

  handleLogout = () => {
    firebase.auth().signOut()
      .then(()=> console.log('Te has desconectado correctamente'))
      .catch(() => console.log('Un Error ocurrio')
      )
  }

  renderHome = () => {
    if(this.state.user){
      return (
        <Main 
          user={this.state.user}
          onLogout={this.handleLogout}
        />
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
