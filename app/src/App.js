import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

const socket = new WebSocket("ws://127.0.0.1:8081/ws");
socket.onopen = (event) => {
  console.log('Opened socket');
};

socket.onerror = (event) => {
  console.log(event);
}

socket.onmessage = (event) => {
  console.log(JSON.parse(event.data));
}

class App extends Component {
  init() {
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick() {
    socket.send(JSON.stringify({ Number: 25 }));
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
