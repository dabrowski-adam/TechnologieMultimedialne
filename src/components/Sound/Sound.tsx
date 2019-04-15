import React, {Component, Fragment} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons'
import './Sound.scss'
import Button from '@material-ui/core/Button'
import PropTypes from "prop-types"

interface ISoundProps {
    source: any,
    isPlaying?: boolean,
    withAdd?: boolean
}

class Sound extends Component<ISoundProps> {
    private audio: any

    static contextTypes = {
        addTrack: PropTypes.func.isRequired
    }


    play = () => {
        return this.audio.play()
    }

    stop = () => {
        this.audio.pause()
        this.audio.currentTime = 0
    }

    load = (e: any) => {

    }

    render() {
        const {source, isPlaying, withAdd} = this.props
        const {addTrack} = this.context

        if (isPlaying) {
            this.stop()
            this.play()
        }

        return (
            <div className="sound">
                <audio
                    src={source}
                    onLoadedData={this.load}
                    ref={a => this.audio = a}
                />
                <div onClick={() => this.play()}>
                    <FontAwesomeIcon icon={faPlayCircle} size={"2x"}/>
                </div>
                {
                    withAdd ?
                        <Button variant="contained" color="primary" onClick={() => addTrack(source)}>
                            Add
                        </Button>
                        : null
                }
            </div>
        )
    }
}

export default Sound