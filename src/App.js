import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './chat.css';

import HomeContainer from './container/HomeContainer';


class App extends Component {
  render() {
    return (
      <HomeContainer />
      // <div className="App">
      //   <header className="App-header">
      //     <Login />
      //   </header>
      // </div>
    );
  } 
}

export default App;
