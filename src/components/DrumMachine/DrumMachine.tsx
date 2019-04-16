import React, {Component, Fragment} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons'
import './DrumMachine.scss'
import SoundList from '../SoundList/SoundList'
import PropTypes from 'prop-types'
import SoundConsole from "../SoundConsole/SoundConsole"


const track1 = require('assets/sounds/DRUMS/track1.wav')
const track2 = require('assets/sounds/DRUMS/track2.wav')
const track3 = require('assets/sounds/DRUMS/track3.wav')
const track4 = require('assets/sounds/DRUMS/track4.wav')
const track5 = require('assets/sounds/DRUMS/track5.wav')
const track6 = require('assets/sounds/DRUMS/track6.wav')
const track7 = require('assets/sounds/DRUMS/track7.wav')
const track8 = require('assets/sounds/DRUMS/track8.wav')
const track9 = require('assets/sounds/DRUMS/track9.wav')
const track10 = require('assets/sounds/DRUMS/track10.wav')

interface IDrumMachineState {
    chosenTracks: any[]
}

class DrumMachine extends Component<{}, IDrumMachineState> {

    state: IDrumMachineState = {
        chosenTracks: []
    }

    static childContextTypes = {
        tracks: PropTypes.array.isRequired,
        addTrack: PropTypes.func.isRequired
    }

    getChildContext = () => {
        return {
            tracks: [
                track1,
                track2,
                track3,
                track4,
                track5,
                track6,
                track7,
                track8,
                track9,
                track10
            ],
            addTrack: (track: any) => this.onAddTrack(track)
        }
    }

    onAddTrack = (track: any) => {
        this.setState({
            chosenTracks: this.state.chosenTracks.concat(track)
        })
    }

    render() {
        const {chosenTracks} = this.state
        return (
            <Fragment>
                <div className='justify-content-center mt-3'>
                    <SoundConsole chosenTracks={chosenTracks}/>
                    <SoundList/>
                </div>
            </Fragment>
        )
    }
}

export default DrumMachine