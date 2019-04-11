import React, {Component, Fragment} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons'
import './DrumMachine.scss'

let Pizzicato = require('pizzicato/distr/Pizzicato')

class DrumMachine extends Component {

    sound: any

    componentWillMount = (): void => {
        this.sound = new Pizzicato.Sound({
            source: 'wave',
            options: {
                type: 'sawtooth'
            }
        })

        this.sound.on('play', () => {
            setTimeout(() => {
                this.sound.stop()
            }, 1000)
        })
    }

    play = (): void => {
        this.sound.play()
    }

    render() {
        return (
            <Fragment>
                <div className='d-flex justify-content-center mt-3' onClick={this.play}>
                    <FontAwesomeIcon icon={faPlayCircle} size='9x' className='play-button'/>
                </div>
            </Fragment>
        )
    }
}

export default DrumMachine