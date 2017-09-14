import React from 'react';

import '../styles/Message.css';

const Message = (props) => {
  console.log(props);
  const { text, client, timestamp } = props.message;

  return (
    <div className="message">
      <div className="message-top">
        <span className="client-name">{client}</span>
        <span className="timestamp">{timestamp}</span>
      </div>
      <div className="message-text">
        {text}
      </div>
    </div>
  );
}

export default Message;
