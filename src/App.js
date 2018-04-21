import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Team, NCO } from './Pages';
import './App.css';

class App extends Component {
  state = {};

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Team} />
          <Route path="/nco" component={NCO} />
        </div>
      </Router>
    );
  }
}

export default App;
