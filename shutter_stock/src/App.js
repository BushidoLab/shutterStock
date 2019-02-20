import React, { Component } from 'react';
import './App.css';

// import UploadForm from './components/PhotosUploader';
import ImageUploadForm from './components/form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ImageUploadForm />
          {/* <UploadForm /> */}
        </header>
      </div>
    );
  }
}

export default App;
