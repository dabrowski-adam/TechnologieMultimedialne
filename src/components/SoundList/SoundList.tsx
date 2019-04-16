import React, {Component, Fragment} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons'
import './SoundList.scss'
import Sound from '../Sound/Sound'
import PropTypes from 'prop-types'
import {Grid} from "@material-ui/core"

class SoundList extends Component {
    static contextTypes = {
        tracks: PropTypes.array.isRequired
    }

    render() {
        const {tracks} = this.context
        return (
            <Grid container spacing={24}>
                    {
                        tracks.map((track: any, index: number) => {
                            return (
                                <Grid item xs={2} key={index.toString()}>
                                    <Sound source={track} withAdd />
                                </Grid>
                            )
                        })
                    }
            </Grid>
        )
    }
}

export default SoundList