import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import DrumMachine from './components/DrumMachine/DrumMachine';

class Root extends Component {
  render() {
    return (
      <Router>
          <Route path='/drum-machine' component={ DrumMachine } />
      </Router>
    );
  }
}

export default Root;

