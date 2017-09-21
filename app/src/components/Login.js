import React from 'react';

import '../styles/Login.css';

const Login = (props) => {
  return (
    <div id="init">
      <form onSubmit={props.participantSubmit}>
        <input type="text"
          placeholder="Enter name here..."
          id="participant-form" />
      </form>
    </div>
  );
}

export default Login;
