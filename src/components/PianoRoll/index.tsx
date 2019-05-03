import React, { useCallback } from 'react';
import useDrumMachine, { Instrument } from '../../lib/useDrumMachine';
import Roll from '../Roll';
import Play from '../Play';
import Clear from '../Clear';
import Tempo from '../Tempo';

const PianoRoll = () => {
  const [selection, select, isPlaying, play, pause, clear] = useDrumMachine();

  const togglePlaying = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const updateTempo = useCallback(tempo => {
    console.log('New tempo: ', tempo);
  }, []);

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        <Play isPlaying={isPlaying} togglePlaying={togglePlaying} />
        <Clear clearSelection={clear} />
        <Tempo updateTempo={updateTempo} />
      </div>
      {Object.entries(selection).map(([instrument, beats]) => (
        <Roll
          instrument={instrument as Instrument}
          beats={beats}
          select={select}
          isPlaying={isPlaying}
          key={instrument}
        />
      ))}
    </div>
  );
};

export default PianoRoll;
