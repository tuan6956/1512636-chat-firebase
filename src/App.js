import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './chat.css';

import Login from './component/authentication/login'
import LoginPage from './component/authentication/loginPage'


class App extends Component {
  render() {
    return (
      <Login />
      // <div className="App">
      //   <header className="App-header">
      //     <Login />
      //   </header>
      // </div>
    );
  } 
}

export default App;
