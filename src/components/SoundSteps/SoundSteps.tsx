import React, {Component, Fragment} from 'react'
import './SoundSteps.scss'
import Sound from '../Sound/Sound'
import PropTypes from 'prop-types'
import {Grid} from "@material-ui/core"
import SquareSelectBox from "../shared/SquareSelectBox/SquareSelectBox"

interface ISoundStepProps {
    track: any,
    currentStep: number,
    isPlaying: boolean
}

interface ISoundStepState {
    steps: boolean[]
}

class SoundSteps extends Component<ISoundStepProps, ISoundStepState> {

    state: ISoundStepState = {
        steps: Array(16).fill(false)
    }

    selectStep = (index: number) => {
        this.setState({
            steps: this.state.steps.map((value: boolean, i: number) => {
                if (i !== index)
                    return value
                else
                    return !value
            })
        })
    }

    render() {
        const {track, currentStep, isPlaying} = this.props
        const {steps} = this.state

        const _isPlaying = isPlaying && currentStep !== -1 && steps[currentStep]
        return (
            <div className="sound-steps">
                <Sound source={track} isPlaying={_isPlaying}/>
                {
                    Array(16).fill(undefined).map((_, i) => {
                        return <SquareSelectBox isSelected={steps[i]} onSelect={() => this.selectStep(i)} key={i}/>
                    })
                }
            </div>
        )
    }
}

export default SoundSteps