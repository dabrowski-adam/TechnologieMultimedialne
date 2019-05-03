import React, { useCallback } from 'react';
import useDrumMachine, { Instrument } from '../../lib/useDrumMachine';
import Roll from '../Roll';

const PianoRoll = () => {
  const [selection, select, isPlaying, play, pause] = useDrumMachine();

  const togglePlaying = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

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
