import React, { Component } from 'react';
import './App.css';

import HomePage from './containers/Homepage.container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <HomePage />
        </header>
      </div>
    );
  }
}

export default App;
