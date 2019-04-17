import React, { useState, useCallback } from 'react'
import { times, always, assoc, update } from 'ramda'
import Tone, { Player } from 'tone'

const kick = require('assets/sounds/DRUMS/track1.wav')
const closed = require('assets/sounds/DRUMS/track2.wav')
const clap = require('assets/sounds/DRUMS/track3.wav')
const open = require('assets/sounds/DRUMS/track4.wav')

enum Instrument {
    OpenHat = "Open Hat",
    ClosedHat = "Closed Hat",
    Clap = "Clap",
    Kick = "Kick"
}

const sounds = {
    [Instrument.OpenHat]: new Tone.Player(open).toMaster(),
    [Instrument.ClosedHat]: new Tone.Player(closed).toMaster(),
    [Instrument.Clap]: new Tone.Player(clap).toMaster(),
    [Instrument.Kick]: new Tone.Player(kick).toMaster(),
}

type InstrumentBeats = {
    [x in Instrument]: Array<boolean>
}

const BEATS = 16

// DrumMachine state hook
const emptySelection = times(always(false), BEATS)

const defaultSelection: InstrumentBeats = {
    [Instrument.OpenHat]: emptySelection,
    [Instrument.ClosedHat]: emptySelection,
    [Instrument.Clap]: emptySelection,
    [Instrument.Kick]: emptySelection,
}

const updateSelection = (selection: InstrumentBeats, instrument: Instrument, n: number, value: boolean) => {
    // console.log(selection[instrument], n, value, assoc(instrument, update(n, value, selection[instrument]), selection))
    return assoc(instrument, update(n, value, selection[instrument]), selection)
}

const useDrumMachine = (): [InstrumentBeats, (instrument: Instrument, n: number, value: boolean) => void] => {
    const [selection, setSelection] = useState(defaultSelection)

    const selectBeat = useCallback(
        (instrument: Instrument, n: number, value: boolean) => {
            // console.log('CLICK', instrument, n, value)
            setSelection(updateSelection(selection, instrument, n, value))
        },
        [selection]
    )

    return [selection, selectBeat]
}

// Beat
type BeatProps = {
    isActive: boolean,
    onClick: any, // TODO: Tighten type
    id: string,
    key: any // TODO: Tighten type
}

const Beat = ({ isActive, onClick, id }: BeatProps) => {

    return (
        <div
            style={{ width: '60px', background: isActive ? 'lightcoral' : 'lightgrey', margin: '1px' }}
            id={id}
            onClick={onClick}
        />
    )
}

// Roll
type RollProps = {
    instrument: Instrument,
    beats: Array<boolean>,
    select: (instrument: Instrument, n: number, value: boolean) => void
}

const Roll = ({ instrument, beats, select }: RollProps) => {
    const previewSound = useCallback(
        () => {
            sounds[instrument].start()
        },
        [instrument]
    )

    const handleClick = useCallback(
        event => {
            previewSound()

            const { id } = event.target
            const n = parseInt(id)
            select(instrument, n, !beats[n])
        },
        [select, instrument]
    )

    return (
        <div style={{ display: 'flex', flex: 1 }}>
            <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '60px', background: 'lightgrey', margin: '1px' }}
                onClick={previewSound}>
                {instrument}
            </div>
            {beats.map((isActive, i) => <Beat isActive={isActive} onClick={handleClick} id={`${i}`} key={i} />)}
        </div>
    )
}

const pause = (sequence?: Tone.Transport) => {
    if (!sequence) { return }
    sequence.stop(0)
    Tone.Transport.stop()
}

const play = (selection: InstrumentBeats): Tone.Sequence => {
    const sequence = new Tone.Sequence((time, col) => {
        // console.log('BEAT', time, col)
        if (selection[Instrument.OpenHat][col]) { sounds[Instrument.OpenHat].start(time, 0, '16n') }
        if (selection[Instrument.ClosedHat][col]) { sounds[Instrument.ClosedHat].start(time, 0, '16n') }
        if (selection[Instrument.Clap][col]) { sounds[Instrument.Clap].start(time, 0, '16n') }
        if (selection[Instrument.Kick][col]) { sounds[Instrument.Kick].start(time, 0, '16n') }
    }, ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'], '16n').start(0)

    Tone.Transport.start()

    return sequence
}

// PianoRoll
const PianoRoll = () => {
    const [selection, select] = useDrumMachine()
    const [sequence, setSequence] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const togglePlaying = useCallback(
        () => {
            if (isPlaying && sequence) {
                // Tone.Transport.clear(sequence)
                pause(sequence)
            } else {
                setSequence(play(selection))
            }

            setIsPlaying(!isPlaying)
        },
        [isPlaying]
    )

    return (
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '60px', padding: '0 30px, 0 30px', margin: '1px', background: 'lightskyblue', color: 'white' }}
                onClick={togglePlaying}
                >
                {isPlaying ? 'STOP' : 'PLAY'}
            </div>
            <Roll instrument={Instrument.OpenHat} beats={selection[Instrument.OpenHat]} select={select} />
            <Roll instrument={Instrument.ClosedHat} beats={selection[Instrument.ClosedHat]} select={select} />
            <Roll instrument={Instrument.Clap} beats={selection.Clap} select={select} />
            <Roll instrument={Instrument.Kick} beats={selection.Kick} select={select} />
        </div>
    )
}

export default PianoRoll
