import React, { Component } from 'react';
import './App.css';

import ImageGallery from './components/imageGallery';
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
