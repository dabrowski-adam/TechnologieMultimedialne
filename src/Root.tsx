import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import DrumMachine from './components/DrumMachine/DrumMachine'

class Root extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" render={() => (
                    <Redirect to="/drum-machine"/>
                )}
                />
                <Route path='/drum-machine' component={DrumMachine}/>
            </Router>
        )
    }
}

export default Root

