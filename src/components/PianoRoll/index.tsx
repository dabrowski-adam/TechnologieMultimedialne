import React, { useState, useCallback } from 'react'
import { range, times, always, assoc, update } from 'ramda'

enum Instrument {
    OpenHat = "Open Hat",
    ClosedHat = "Closed Hat",
    Clap = "Clap",
    Kick = "Kick"
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
    console.log(selection[instrument], n, value, assoc(instrument, update(n, value, selection[instrument]), selection))
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
    const handleClick = useCallback(
        event => {
            const { id } = event.target
            const n = parseInt(id)
            select(instrument, n, !beats[n])
        },
        [select, instrument]
    ) 

    return (
        <div style={{ display: 'flex', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '60px', background: 'lightgrey', margin: '1px' }}>
                {instrument}
            </div>
            {beats.map((isActive, i) => <Beat isActive={isActive} onClick={handleClick} id={`${i}`} key={i} />)}
        </div>
    )
}

// PianoRoll
const PianoRoll = () => {
    const [selection, select] = useDrumMachine()

    return (
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <Roll instrument={Instrument.OpenHat} beats={selection[Instrument.OpenHat]} select={select} />
            <Roll instrument={Instrument.ClosedHat} beats={selection[Instrument.ClosedHat]} select={select} />
            <Roll instrument={Instrument.Clap} beats={selection.Clap} select={select} />
            <Roll instrument={Instrument.Kick} beats={selection.Kick} select={select} />
        </div>
    )
}

export default PianoRoll
