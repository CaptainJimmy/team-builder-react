import React from 'react';

const header = props => {
  return (
    <div>
      <header className="App-header">
        <img src={props.logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to {props.program}</h1>
      </header>
    </div>
  );
};

export default header;
