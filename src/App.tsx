import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'
import Root from './Root'
import {Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
    render() {
        return (
            <Container>
                <Root/>
            </Container>
        )
    }
}

export default App
