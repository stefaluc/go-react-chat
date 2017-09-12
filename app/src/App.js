import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  init() {
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick() {
  }

  render() {
    return (
      <div className="App">
        <div className="App-header"></div>
        <br />
        <button onClick={this.buttonClick}>Send Message</button>
      </div>
    );
  }
}

export default App;
