import React, { useCallback } from 'react';
import { range } from 'ramda';
import useDrumMachine, {
  Instrument,
  OnChangePassedState
} from '../../lib/useDrumMachine';
import Roll from '../Roll';
import Play from '../Play';
import Clear from '../Clear';
import Tempo from '../Tempo';
import Button from '../shared/Button';
import { Link } from 'react-router-dom';

type CustomizablePianoRollProps = {
  enableTempo?: boolean;
  enablePitch?: boolean;
  enableQuantization?: boolean;
  instruments?: Instrument[];
  nextRoute?: string;
  onChange?: (state: OnChangePassedState) => void;
};

const CustomizablePianoRoll = ({
  enableTempo = false,
  enablePitch = false,
  enableQuantization = false,
  instruments = [Instrument.Kick],
  nextRoute,
  onChange
}: CustomizablePianoRollProps) => {
  const [
    selection,
    select,
    isPlaying,
    play,
    pause,
    clear,
    tempo,
    setTempo,
    setPitch,
    currentBeat,
    updateMouseDown,
    updateMouseUp,
    mouseEnter,
    mouseLeave,
    selectionRange
  ] = useDrumMachine(onChange);

  const togglePlaying = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const updateTempo = useCallback(
    value => {
      setTempo(value);
    },
    [setTempo]
  );

  const reset = useCallback(() => {
    clear();
    setTempo(120);
    Object.keys(selection).forEach(instrument =>
      setPitch(instrument as Instrument, 1)
    );
  }, [clear, setTempo, selection, setPitch]);

  return (
    <div
      style={{ width: enablePitch ? '1177px' : '1115px', margin: '0 auto' }}
      className="drum-machine"
    >
      <div style={{ display: 'flex', paddingLeft: enablePitch ? '62px' : 0 }}>
        <Play isPlaying={isPlaying} togglePlaying={togglePlaying} />
        {enableTempo && <Tempo value={tempo} onChange={updateTempo} />}
        <Clear clearSelection={clear} />
        {nextRoute && (
          <Link to={nextRoute} style={{ marginLeft: 'auto' }}>
            <Button
              onClick={reset}
              style={{ marginLeft: 'auto', background: 'limegreen' }}
              className="next"
            >
              NEXT
            </Button>
          </Link>
        )}
      </div>
      {Object.entries(selection)
        .filter(([instrument]) =>
          instruments.includes(instrument as Instrument)
        )
        .map(([instrument, beats]) => (
          <Roll
            enablePitch={enablePitch}
            enableQuantization={enableQuantization}
            selectionRange={selectionRange}
            instrument={instrument as Instrument}
            beats={beats}
            select={select}
            isPlaying={isPlaying}
            setPitch={setPitch}
            key={instrument}
            currentBeat={currentBeat}
            updateMouseDown={updateMouseDown}
            updateMouseUp={updateMouseUp}
            mouseEnter={mouseEnter}
            mouseLeave={mouseLeave}
          />
        ))}
      <div style={{ display: 'flex', marginLeft: 'auto', width: '992px' }}>
        {range(1, 17).map(n => (
          <div
            key={n}
            style={{
              width: '62px',
              textAlign: 'center',
              color: n % 4 === 1 ? 'grey' : 'lightgrey',
              flexShrink: 0
            }}
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomizablePianoRoll;
