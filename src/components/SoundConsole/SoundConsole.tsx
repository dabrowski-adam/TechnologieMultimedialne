import React, {Component, Fragment} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons'
import './SoundConsole.scss'
import PropTypes from 'prop-types'
import {Grid} from "@material-ui/core"
import Sound from "../Sound/Sound"
import SquareSelectBox from "../shared/SquareSelectBox/SquareSelectBox"
import SoundSteps from "../SoundSteps/SoundSteps"

interface ISoundConsoleProps {
    chosenTracks: any[]
}

interface ISoundConsoleState {
    isPlaying: boolean,
    currentStep: number
}

class SoundConsole extends Component<ISoundConsoleProps, ISoundConsoleState> {
    steps = 16

    state: ISoundConsoleState = {
        isPlaying: false,
        currentStep: -1
    }

    playStop = () => {
        this.setState({isPlaying: !this.state.isPlaying})
    }

    render() {
        const {chosenTracks} = this.props
        const {currentStep, isPlaying} = this.state
        return (
            <div className="sound-console">
                <div onClick={() => this.playStop()}>
                    <FontAwesomeIcon icon={faPlayCircle} size={"9x"}/>
                </div>
                {
                    chosenTracks.map((track: any, index: number) => {
                        return (
                            <SoundSteps track={track} currentStep={currentStep} isPlaying={isPlaying} key={index}/>
                        )
                    })
                }
            </div>
        )
    }
}

export default SoundConsole