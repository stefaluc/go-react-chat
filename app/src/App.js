import React, { Component } from 'react';

import './App.css';

const socket = new WebSocket("ws://127.0.0.1:8081/ws");
socket.onopen = (event) => {
  console.log('Opened socket');
};

socket.onerror = (event) => {
  console.log(event);
}


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };

    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick() {
    socket.send(JSON.stringify({
      text: "test",
      client: "testClient",
    }));
  }

  componentDidMount() {
    socket.onmessage = (event) => {
      const { text, client } = JSON.parse(event.data);

      this.setState({
        messages: [...this.state.messages, text],
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div id="box-main">
        <div id="top">
          <div id="users-main"></div>
          <div id="conversation-main">
            {this.state.messages.map(message =>
              <div>{message}</div>
            )}
          </div>
        </div>
        <div id="bottom">
          <div id="text-entry-main">
            <div id="text-entry-form">
            </div>
            <div onClick={this.buttonClick} id="text-entry-submit">
              Send Message
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
