import { always, assoc, times, update, range, toString } from 'ramda';
import { useCallback, useState } from 'react';
import Tone from 'tone';
import kick from 'assets/sounds/track1.wav';
import snare from 'assets/sounds/track2.wav';
import clap from 'assets/sounds/track3.wav';
import closed from 'assets/sounds/track4.wav';
import shaker from 'assets/sounds/track5.wav';
import open from 'assets/sounds/track6.wav';
import tri from 'assets/sounds/track7.wav';
import rim from 'assets/sounds/track8.wav';
import clav from 'assets/sounds/track9.wav';
import cow from 'assets/sounds/track10.wav';

export enum Instrument {
  OpenHat = 'Open Hat',
  ClosedHat = 'Closed Hat',
  Clap = 'Clap',
  Kick = 'Kick',
  Snare = 'Snare',
  Triangle = 'Triangle',
  Rimshot = 'Rimshot',
  Clave = 'Clave',
  Cowbell = 'Cowbell',
  Shaker = 'Shaker'
}

export const sounds = {
  [Instrument.OpenHat]: new Tone.Player(open).toMaster(),
  [Instrument.ClosedHat]: new Tone.Player(closed).toMaster(),
  [Instrument.Clap]: new Tone.Player(clap).toMaster(),
  [Instrument.Kick]: new Tone.Player(kick).toMaster(),
  [Instrument.Snare]: new Tone.Player(snare).toMaster(),
  [Instrument.Triangle]: new Tone.Player(tri).toMaster(),
  [Instrument.Rimshot]: new Tone.Player(rim).toMaster(),
  [Instrument.Cowbell]: new Tone.Player(cow).toMaster(),
  [Instrument.Clave]: new Tone.Player(clav).toMaster(),
  [Instrument.Shaker]: new Tone.Player(shaker).toMaster()
};

export const playSound = (instrument: Instrument) => {
  sounds[instrument].start();
};

const INTERVAL = '16n';

const makeSequence = (
  selection: InstrumentBeats,
  setCurrentBeat: any
): Tone.Sequence => {
  const sequence = new Tone.Sequence(
    (time, col) => {
      setCurrentBeat(col);
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
  [Instrument.Kick]: emptySelection,
  [Instrument.Snare]: emptySelection,
  [Instrument.Clap]: emptySelection,
  [Instrument.ClosedHat]: emptySelection,
  [Instrument.OpenHat]: emptySelection,
  [Instrument.Clave]: emptySelection,
  [Instrument.Shaker]: emptySelection,
  [Instrument.Rimshot]: emptySelection,
  [Instrument.Triangle]: emptySelection,
  [Instrument.Cowbell]: emptySelection
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
  (tempo: number) => void,
  number
] => {
  const [selection, setSelection] = useState(defaultSelection);
  const [sequence, setSequence] = useState<Tone.Sequence>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(Tone.Transport.bpm.value); // Could this be solved better?
  const [currentBeat, setCurrentBeat] = useState(-1);

  const play = useCallback(() => {
    setSequence(makeSequence(selection, setCurrentBeat));
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
        const updatedSequence = makeSequence(updatedSelection, setCurrentBeat);
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
    changeTempo,
    currentBeat
  ];
};

export default useDrumMachine;
