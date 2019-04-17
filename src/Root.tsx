import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import DrumMachine from './components/DrumMachine/DrumMachine'
import PianoRoll from './components/PianoRoll'

class Root extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" render={() => (
                    <Redirect to="/piano-roll"/>
                )}
                />
                <Route path='/drum-machine' component={DrumMachine}/>
                <Route path='/piano-roll' component={PianoRoll}/>
            </Router>
        )
    }
}

export default Root

