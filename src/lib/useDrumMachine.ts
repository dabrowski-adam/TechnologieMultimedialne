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

const INTERVAL = '16n';

const makeSequence = (selection: InstrumentBeats): Tone.Sequence => {
  const sequence = new Tone.Sequence(
    (time, col) => {
      // console.log('Sequence progress', col, time)

      Object.entries(selection).forEach(([instrument, beats]) => {
        if (beats[col]) {
          sounds[instrument as Instrument].start(time, 0, '16n');
        }
      });
    },
    range(0, 15).map(toString),
    INTERVAL
  ).start(0);

  return sequence;
};

const startPlaying = () => {
  Tone.Transport.start();
};

const stopPlaying = (sequence?: Tone.Sequence) => {
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
  () => void,
  () => void,
  number,
  (tempo: number) => void
] => {
  const [selection, setSelection] = useState(defaultSelection);
  const [sequence, setSequence] = useState<Tone.Sequence>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(Tone.Transport.bpm.value); // Could this be solved better?

  const play = useCallback(() => {
    setSequence(makeSequence(selection));
    startPlaying();
    setIsPlaying(true);
  }, [selection, setSequence, setIsPlaying]);

  const pause = useCallback(() => {
    if (!sequence) {
      return;
    }

    stopPlaying(sequence);
    setIsPlaying(false);
  }, [sequence]);

  const selectBeat = useCallback(
    (instrument: Instrument, n: number, value: boolean) => {
      const updatedSelection = updateSelection(selection, instrument, n, value);
      setSelection(updatedSelection);

      if (isPlaying) {
        // 'Modify' currently playing sequence
        const { progress } = sequence;
        sequence.stop(0);
        const updatedSequence = makeSequence(updatedSelection);
        updatedSequence.start(progress);
        setSequence(updatedSequence);
      }
    },
    [selection, isPlaying, sequence]
  );

  const clearSelection = useCallback(() => {
    setSelection(defaultSelection);
    pause();
  }, [setSelection, pause]);

  const changeTempo = useCallback(
    tempo => {
      setTempo(tempo);
      Tone.Transport.bpm.value = tempo;
      // TODO: Ramp instead? Tone.Transport.bpm.rampTo(tempo, seconds);
    },
    [setTempo]
  );

  return [
    selection,
    selectBeat,
    isPlaying,
    play,
    pause,
    clearSelection,
    tempo,
    changeTempo
  ];
};

export default useDrumMachine;
