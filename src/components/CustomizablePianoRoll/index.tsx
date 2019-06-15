import React, { useCallback } from 'react';
import { range } from 'ramda';
import useDrumMachine, { Instrument } from '../../lib/useDrumMachine';
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
};

const CustomizablePianoRoll = ({
  enableTempo = false,
  enablePitch = false,
  instruments = [Instrument.Kick],
  nextRoute
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
  ] = useDrumMachine();

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
      <div style={{ display: 'flex' }}>
        {enableTempo && <Tempo value={tempo} onChange={updateTempo} />}
        <Play isPlaying={isPlaying} togglePlaying={togglePlaying} />
        <Clear clearSelection={clear} />
        {nextRoute && (
          <Link to={nextRoute} style={{ marginLeft: 'auto' }}>
            <Button
              onClick={() => {}}
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
      <div style={{ display: 'flex', marginLeft: '123px' }}>
        {range(1, 17).map(n => (
          <div
            key={n}
            style={{
              width: '62px',
              textAlign: 'center',
              color: n % 4 === 1 ? 'grey' : 'lightgrey'
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
