import React, { Component } from 'react';
import './App.css';
import 'normalize-css'
import Header from './components/Header'
import Main from './components/Main'

class App extends Component {

  constructor(){
    super()
    this.state = {
       user: {
         photoURL: "https://pbs.twimg.com/profile_images/1065632042950500353/PjGFZqpF_400x400.jpg",
         email: 'johannpino@gmail.com',
         displayName: 'Johann Pino',
         OpenText: false
       }
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main user={this.state.user} />
      </div>
    );
  }
}

export default App;
