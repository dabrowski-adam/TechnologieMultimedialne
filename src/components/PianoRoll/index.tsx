import { always, assoc, times, update, range, toString } from 'ramda';
import React, { useCallback, useState } from 'react';
import Tone from 'tone';

const kick = require('assets/sounds/drums/track1.wav');
const closed = require('assets/sounds/drums/track2.wav');
const clap = require('assets/sounds/drums/track3.wav');
const open = require('assets/sounds/drums/track4.wav');

enum Instrument {
  OpenHat = 'Open Hat',
  ClosedHat = 'Closed Hat',
  Clap = 'Clap',
  Kick = 'Kick'
}

const sounds = {
  [Instrument.OpenHat]: new Tone.Player(open).toMaster(),
  [Instrument.ClosedHat]: new Tone.Player(closed).toMaster(),
  [Instrument.Clap]: new Tone.Player(clap).toMaster(),
  [Instrument.Kick]: new Tone.Player(kick).toMaster()
};

type InstrumentBeats = { [x in Instrument]: Array<boolean> };

const BEATS = 16;

// DrumMachine state hook
const emptySelection = times(always(false), BEATS);

const defaultSelection: InstrumentBeats = {
  [Instrument.OpenHat]: emptySelection,
  [Instrument.ClosedHat]: emptySelection,
  [Instrument.Clap]: emptySelection,
  [Instrument.Kick]: emptySelection
};

const updateSelection = (
  selection: InstrumentBeats,
  instrument: Instrument,
  n: number,
  value: boolean
) => {
  return assoc(instrument, update(n, value, selection[instrument]), selection);
};

const useDrumMachine = (): [
  InstrumentBeats,
  (instrument: Instrument, n: number, value: boolean) => void
] => {
  const [selection, setSelection] = useState(defaultSelection);

  const selectBeat = useCallback(
    (instrument: Instrument, n: number, value: boolean) => {
      setSelection(updateSelection(selection, instrument, n, value));
    },
    [selection]
  );

  return [selection, selectBeat];
};

// Beat
type BeatProps = {
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  id: string;
};

const Beat = ({ isActive, onClick, id }: BeatProps) => {
  return (
    <div
      style={{
        width: '60px',
        background: isActive ? 'lightcoral' : 'lightgrey',
        margin: '1px'
      }}
      id={id}
      onClick={onClick}
    />
  );
};

// Roll
type RollProps = {
  instrument: Instrument;
  beats: Array<boolean>;
  select: (instrument: Instrument, n: number, value: boolean) => void;
};

const Roll = ({ instrument, beats, select }: RollProps) => {
  const previewSound = useCallback(() => {
    sounds[instrument].start();
  }, [instrument]);

  const handleClick = useCallback(
    event => {
      previewSound();

      const { id } = event.target;
      const n = parseInt(id);
      select(instrument, n, !beats[n]);
    },
    [previewSound, select, instrument, beats]
  );

  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '120px',
          height: '60px',
          background: 'lightgrey',
          margin: '1px'
        }}
        onClick={previewSound}
      >
        {instrument}
      </div>
      {beats.map((isActive, i) => (
        <Beat isActive={isActive} onClick={handleClick} id={`${i}`} key={i} />
      ))}
    </div>
  );
};

const pause = (sequence?: Tone.Transport) => {
  if (!sequence) {
    return;
  }
  sequence.stop(0);
  Tone.Transport.stop();
};

const play = (selection: InstrumentBeats): Tone.Sequence => {
  const sequence = new Tone.Sequence(
    (time, col) => {
      Object.entries(selection).forEach(([instrument, beats]) => {
        if (beats[col]) {
          sounds[instrument as Instrument].start(time, 0, '16n');
        }
      });
    },
    range(0, 15).map(toString),
    '16n'
  ).start(0);

  Tone.Transport.start();

  return sequence;
};

// PianoRoll
const PianoRoll = () => {
  const [selection, select] = useDrumMachine();
  const [sequence, setSequence] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlaying = useCallback(() => {
    if (isPlaying && sequence) {
      // Tone.Transport.clear(sequence)
      pause(sequence);
      setIsPlaying(false);
    } else {
      setSequence(play(selection));
      setIsPlaying(true);
    }
  }, [isPlaying, selection, sequence]);

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '120px',
          height: '60px',
          padding: '0 30px, 0 30px',
          margin: '1px',
          background: 'lightskyblue',
          color: 'white'
        }}
        onClick={togglePlaying}
      >
        {isPlaying ? 'STOP' : 'PLAY'}
      </div>
      {Object.entries(selection).map(([instrument, beats]) => (
        <Roll
          instrument={instrument as Instrument}
          beats={beats}
          select={select}
          key={instrument}
        />
      ))}
    </div>
  );
};

export default PianoRoll;
