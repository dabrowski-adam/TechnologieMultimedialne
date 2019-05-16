import React, { useCallback } from 'react';
import useDrumMachine, { Instrument } from '../../lib/useDrumMachine';
import Roll from '../Roll';
import Play from '../Play';
import Clear from '../Clear';
import Tempo from '../Tempo';

const PianoRoll = () => {
  const [
    selection,
    select,
    isPlaying,
    play,
    pause,
    clear,
    tempo,
    setTempo,
    currentBeat
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
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        <Play isPlaying={isPlaying} togglePlaying={togglePlaying} />
        <Clear clearSelection={clear} />
        <Tempo value={tempo} onChange={updateTempo} />
      </div>
      {Object.entries(selection).map(([instrument, beats]) => (
        <Roll
          instrument={instrument as Instrument}
          beats={beats}
          select={select}
          isPlaying={isPlaying}
          key={instrument}
          currentBeat={currentBeat}
        />
      ))}
    </div>
  );
};

export default PianoRoll;
