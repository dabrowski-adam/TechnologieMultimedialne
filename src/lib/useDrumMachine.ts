import { always, assoc, times, update, range, toString } from 'ramda';
import { useCallback, useState } from 'react';
import Tone from 'tone';
import kick from 'assets/sounds/track1.wav';
import kick2 from 'assets/sounds/track1.wav';
import snare from 'assets/sounds/track2.wav';
import clap from 'assets/sounds/track3.wav';
import closed from 'assets/sounds/track4.wav';
import shaker from 'assets/sounds/track5.wav';
import open from 'assets/sounds/track6.wav';
import tri from 'assets/sounds/track7.wav';
import rim from 'assets/sounds/track8.wav';
import clav from 'assets/sounds/track9.wav';
import cow from 'assets/sounds/track10.wav';
import min from 'ramda/es/min';
import max from 'ramda/es/max';

export enum Instrument {
  OpenHat = 'Open Hat',
  ClosedHat = 'Closed Hat',
  Clap = 'Clap',
  Kick = 'Kick',
  Kick2 = 'Kick 2',
  Snare = 'Snare',
  Triangle = 'Triangle',
  Rimshot = 'Rimshot',
  Clave = 'Clave',
  Cowbell = 'Cowbell',
  Shaker = 'Shaker'
}

export enum SelectionDirection {
  None,
  Left,
  Right
}

// const DEFAULT_PITCH = 0;

export const sounds = {
  [Instrument.OpenHat]: new Tone.Player(open).toMaster(),
  [Instrument.ClosedHat]: new Tone.Player(closed).toMaster(),
  [Instrument.Clap]: new Tone.Player(clap).toMaster(),
  [Instrument.Kick]: new Tone.Player(kick).toMaster(),
  [Instrument.Kick2]: new Tone.Player(kick2).toMaster(),
  [Instrument.Snare]: new Tone.Player(snare).toMaster(),
  [Instrument.Triangle]: new Tone.Player(tri).toMaster(),
  [Instrument.Rimshot]: new Tone.Player(rim).toMaster(),
  [Instrument.Cowbell]: new Tone.Player(cow).toMaster(),
  [Instrument.Clave]: new Tone.Player(clav).toMaster(),
  [Instrument.Shaker]: new Tone.Player(shaker).toMaster()
};

const changePitch = (instrument: Instrument, pitch: number) => {
  sounds[instrument].playbackRate = pitch;
};

export const playSound = (instrument: Instrument) => {
  sounds[instrument].start();
};

const INTERVAL = '16n';

const makeSequence = (
  selection: InstrumentBeats,
  setCurrentBeat: (beat: number) => void
): Tone.Sequence => {
  const sequence = new Tone.Sequence(
    (time, col) => {
      setCurrentBeat(parseInt(col));
      Object.entries(selection).forEach(([instrument, beats]) => {
        if (beats[col]) {
          sounds[instrument as Instrument].start(time, 0, '16n');
        }
      });
    },
    range(0, 16).map(toString),
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
  [Instrument.Kick2]: emptySelection,
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
) =>
  assoc(
    instrument,
    update(parseInt(`${n}`), value, selection[instrument]),
    selection
  );

const updateSelectionRange = (
  selection: InstrumentBeats,
  instrument: Instrument,
  n: number[],
  value: boolean
): InstrumentBeats => {
  let selectionCopy = selection;
  for (let i in n) {
    selectionCopy = updateSelection(selectionCopy, instrument, n[i], value);
  }

  return selectionCopy;
};

type InstrumentPitches = { [x in Instrument]: number };

export type OnChangePassedState = {
  selection: InstrumentBeats;
  tempo: number;
  pitches: InstrumentPitches;
};

const useDrumMachine = (
  onChange?: (state: OnChangePassedState) => void
): [
  InstrumentBeats,
  (instrument: Instrument, n: number, value: boolean) => void,
  boolean,
  () => void,
  () => void,
  () => void,
  number,
  (tempo: number) => void,
  (instrument: Instrument, pitch: number) => void,
  number,
  (beat: number, instrument: Instrument, value: boolean) => void,
  (beat: number, instrument: Instrument) => void,
  (beat: number, instrument: Instrument) => void,
  (beat: number, instrument: Instrument) => void,
  { instrument: Instrument; range: number[] }
] => {
  const [selection, _setSelection] = useState(defaultSelection);
  const [sequence, setSequence] = useState<Tone.Sequence>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, _setTempo] = useState(Tone.Transport.bpm.value); // Could this be solved better?
  const [currentBeat, setCurrentBeat] = useState<number>(-1);
  const [mouseDownValue, setMouseDownValue] = useState(null);
  const [selectionRange, setSelectionRange] = useState({
    instrument: null,
    range: []
  });

  // onChange hook
  const getState = useCallback(
    (_selection, _tempo) => ({
      selection: _selection || selection,
      tempo: _tempo || tempo,
      pitches: Object.entries(sounds).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key as Instrument]: value.playbackRate
        }),
        {}
      )
    }),
    [selection, tempo]
  );

  const setSelection = useCallback(
    _selection => {
      _setSelection(_selection);
      if (onChange) {
        // @ts-ignore
        onChange(getState(_selection));
      }
    },
    [onChange, _setSelection, getState]
  );
  const setTempo = useCallback(
    _tempo => {
      _setTempo(_tempo);
      if (onChange) {
        // @ts-ignore
        onChange(getState(_tempo));
      }
    },
    [onChange, getState, _setTempo]
  );
  const setPitch = useCallback(
    (instrument: Instrument, pitch: number) => {
      changePitch(instrument, pitch);
      if (onChange) {
        // @ts-ignore
        onChange(getState());
      }
    },
    [onChange, getState]
  );

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
    setCurrentBeat(-1);
  }, [sequence]);

  const selectBeat = useCallback(
    (instrument: Instrument, n: number, value: boolean) => {
      // Quantization
      if (n == null && !isPlaying) {
        return;
      }
      const beat = n == null ? currentBeat : n;
      playSound(instrument);

      const updatedSelection = updateSelection(
        selection,
        instrument,
        beat,
        value
      );
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
    [selection, isPlaying, sequence, currentBeat, setSelection]
  );

  const selectBeats = (instrument: Instrument, n: number[], value: boolean) => {
    const updatedSelection = updateSelectionRange(
      selection,
      instrument,
      n,
      value
    );
    if (n.length === 1 && !isPlaying) {
      playSound(instrument);
    }
    setSelection(updatedSelection);

    if (isPlaying) {
      // 'Modify' currently playing sequence
      const { progress } = sequence;
      sequence.stop(0);
      const updatedSequence = makeSequence(updatedSelection, setCurrentBeat);
      updatedSequence.start(progress);
      setSequence(updatedSequence);
    }
  };

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

  const updateMouseDown = (
    mouseDownBeat: number,
    instrument: Instrument,
    value: boolean
  ) => {
    setMouseDownValue({
      beat: mouseDownBeat,
      instrument,
      value
    });
    setSelectionRange({ instrument, range: [mouseDownBeat] });
  };

  const updateMouseUp = (mouseUpValue: number, instrument: Instrument) => {
    if (mouseDownValue) {
      selectBeats(
        mouseDownValue.instrument,
        range(
          min(mouseUpValue, mouseDownValue.beat),
          max(mouseUpValue, mouseDownValue.beat) + 1
        ),
        mouseDownValue.value
      );
    }
    setMouseDownValue(null);
    setSelectionRange({ instrument: null, range: [] });
  };

  const onMouseEnter = (beat: number, instrument: Instrument) => {
    if (mouseDownValue) {
      calculateSelectionRange(beat, instrument);
    }
  };

  const onMouseLeave = (beat: number, instrument: Instrument) => {
    if (mouseDownValue) {
      calculateSelectionRange(beat, instrument);
    }
  };

  const calculateSelectionRange = (beat: number, instrument: Instrument) => {
    if (mouseDownValue) {
      setSelectionRange({
        instrument: selectionRange.instrument,
        range: range(
          min(beat, mouseDownValue.beat),
          max(beat, mouseDownValue.beat) + 1
        )
      });
    }
  };

  return [
    selection,
    selectBeat,
    isPlaying,
    play,
    pause,
    clearSelection,
    tempo,
    changeTempo,
    setPitch,
    currentBeat,
    updateMouseDown,
    updateMouseUp,
    onMouseEnter,
    onMouseLeave,
    selectionRange
  ];
};

export default useDrumMachine;
