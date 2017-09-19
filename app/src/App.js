import React, { Component } from 'react';

import Message from './components/Message';
import './App.css';

let socket = null;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      init: true,
      participants: [],
      messages: [],
      name: "",
    };

    this.participantSubmit = this.participantSubmit.bind(this);
    this.textSubmit = this.textSubmit.bind(this);
  }

  participantSubmit(e) {
    e.preventDefault();
    const input = document.getElementById("participant-form").value;
    if (input === "") {
      return;
    }

    // init client websocket
    socket = new WebSocket(`ws://127.0.0.1:8081/ws?name=${input}`);
    socket.onopen = (event) => {
      console.log('Opened socket');
    };
    socket.onerror = (event) => {
      console.log(event);
    }
    this.setState({
      init: false,
      name: input,
      participants: [],
    });
  }

  textSubmit(e) {
    e.preventDefault();
    const input = document.getElementById("text-entry-input").value;
    if (input === "") {
      return;
    }

    // send message request to server
    socket.send(JSON.stringify({
      text: input,
      name: this.state.name,
      timestamp: new Date().toLocaleTimeString(),
    }));

    document.getElementById("text-entry-input").value = "";
  }

  componentDidUpdate() {
    // keep message box scrolled appropriately with new messages
    if (!this.state.init) {
      document.getElementById("conversation-main").scrollTop = document.getElementById("conversation-main").scrollHeight;

      console.log("componentDidUpdate")
      socket.onmessage = (event) => {
        console.log(event);
        const data = JSON.parse(event.data);
        console.log(data);
        if (!data.text) { // client added
          this.setState({
            participants: data
          });
        } else { // message added
          const { text, name, timestamp } = data;

          this.setState({
            messages: [
              ...this.state.messages,
              {
                text,
                name,
                timestamp,
              }
            ],
          });
        }
      }
    }
  }

  render() {
    console.log(this.state);
    return (
      <div id="box-main">
        {this.state.init &&
          <div id="init">
            <form onSubmit={this.participantSubmit}>
              <input type="text"
                     placeholder="Enter name here..."
                     id="participant-form" />
            </form>
          </div>
        }
        {!this.state.init &&
          <div style={{width: "100%", height: "100%"}}>
            <div id="top">
              <div id="participants-main">
                <b>{`Participants (${this.state.participants.length}):`}</b>
                {this.state.participants.map(participant =>
                  <div>{participant}</div>
                )}
              </div>
              <div id="conversation-main">
                <a href="https://github.com/stefaluc/go-react-chat"
                  id="source"
                  target="_blank"
                  rel="noopener noreferrer">View source code</a>
                {this.state.messages.map(message =>
                  <Message message={message} />
                )}
              </div>
            </div>
            <div id="bottom">
              <div id="text-entry-main">
                <form onSubmit={this.textSubmit} id="text-entry-form">
                  <input type="text" id="text-entry-input" />
                </form>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
