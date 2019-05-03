import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Root from './Root';

class App extends Component {
  render() {
    return (
      <Container>
        <Root />
      </Container>
    );
  }
}

export default App;
