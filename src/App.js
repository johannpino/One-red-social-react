import React, { Component } from 'react'
import 'normalize-css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Profile from './components/Profile'
import Login from './components/Login';
import firebase from './initializers/firebase'
import { setUser, clearUser } from './redux/actions';

class App extends Component {

  renderProfile = () => (
    <Profile
      picture={this.props.user.photoURL}
      username={this.props.user.email.split('@')[0]}
      displayName={this.props.user.displayName}
      location={this.props.user.location}
      emailAddress={this.props.user.email}
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
    if(this.props.user){
      return (
        <Main 
          user={this.props.user}
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

const mapStateToPros = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => (
  {
    setUser: user => dispatch(setUser(user)),
    clearUser: () => dispatch(clearUser())
  }
)


export default connect(mapStateToPros, mapDispatchToProps)(App);
