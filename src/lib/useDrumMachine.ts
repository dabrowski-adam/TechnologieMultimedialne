import { always, assoc, times, update, range, toString } from 'ramda';
import { useCallback, useState } from 'react';
import Tone from 'tone';

const kick = require('assets/sounds/drums/track1.wav');
const closed = require('assets/sounds/drums/track2.wav');
const clap = require('assets/sounds/drums/track3.wav');
const open = require('assets/sounds/drums/track4.wav');

export enum Instrument {
  OpenHat = 'Open Hat',
  ClosedHat = 'Closed Hat',
  Clap = 'Clap',
  Kick = 'Kick'
}

export const sounds = {
  [Instrument.OpenHat]: new Tone.Player(open).toMaster(),
  [Instrument.ClosedHat]: new Tone.Player(closed).toMaster(),
  [Instrument.Clap]: new Tone.Player(clap).toMaster(),
  [Instrument.Kick]: new Tone.Player(kick).toMaster()
};

export const playSound = (instrument: Instrument) => {
  sounds[instrument].start();
};

const makeSequence = (selection: InstrumentBeats): Tone.Sequence => {
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

  return sequence;
};

const playSequence = () => {
  Tone.Transport.start();
};

const stopSequence = (sequence?: Tone.Transport) => {
  if (!sequence) {
    return;
  }
  sequence.stop(0);
  Tone.Transport.stop();
};

// hook
export type InstrumentBeats = { [x in Instrument]: Array<boolean> };

const BEATS = 16;

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
) => assoc(instrument, update(n, value, selection[instrument]), selection);

const useDrumMachine = (): [
  InstrumentBeats,
  (instrument: Instrument, n: number, value: boolean) => void,
  boolean,
  () => void,
  () => void
] => {
  const [selection, setSelection] = useState(defaultSelection);
  const [sequence, setSequence] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const selectBeat = useCallback(
    (instrument: Instrument, n: number, value: boolean) => {
      setSelection(updateSelection(selection, instrument, n, value));
    },
    [selection]
  );

  const play = useCallback(() => {
    setSequence(makeSequence(selection));
    playSequence();
    setIsPlaying(true);
  }, [selection, setSequence, setIsPlaying]);

  const pause = useCallback(() => {
    if (!sequence) {
      return;
    }

    stopSequence(sequence);
    setIsPlaying(false);
  }, [sequence]);

  return [selection, selectBeat, isPlaying, play, pause];
};

export default useDrumMachine;
