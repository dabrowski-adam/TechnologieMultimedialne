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
  instruments?: Instrument[];
  nextRoute?: string;
  onChange?: (state: OnChangePassedState) => void;
};

const CustomizablePianoRoll = ({
  enableTempo = false,
  enablePitch = false,
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

  return (
    <div
      style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
      className="drum-machine"
    >
      <div style={{ display: 'flex', paddingLeft: '62px' }}>
        <Play isPlaying={isPlaying} togglePlaying={togglePlaying} />
        {enableTempo && <Tempo value={tempo} onChange={updateTempo} />}
        <Clear clearSelection={clear} />
        {nextRoute && (
          <Link to={nextRoute} style={{ marginLeft: 'auto' }}>
            <Button
              onClick={pause}
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
