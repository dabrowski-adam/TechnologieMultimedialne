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
    setPitch,
    currentBeat,
    updateMouseDown,
    updateMouseUp,
    mouseEnter,
    mouseLeave
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
        <Tempo value={tempo} onChange={updateTempo} />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '60px',
          background: 'lightskyblue',
          margin: '1px'
        }}>{tempo.toFixed(0) + "BPM"}</div>
        <Play isPlaying={isPlaying} togglePlaying={togglePlaying} />
        <Clear clearSelection={clear} />
      </div>
      {Object.entries(selection).map(([instrument, beats]) => (
        <Roll
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
    </div>
  );
};

export default PianoRoll;
