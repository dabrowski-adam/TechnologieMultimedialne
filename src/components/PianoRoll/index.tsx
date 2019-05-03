import React, { useCallback } from 'react';
import useDrumMachine, { Instrument } from '../../lib/useDrumMachine';
import Roll from '../Roll';

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '120px',
  height: '60px',
  padding: '0 30px, 0 30px',
  margin: '1px',
  background: 'lightskyblue',
  color: 'white'
};

type PlayProps = {
  togglePlaying: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isPlaying: boolean;
};

const Play = ({ togglePlaying, isPlaying }: PlayProps) => (
  <div style={buttonStyle} onClick={togglePlaying}>
    {isPlaying ? 'STOP' : 'PLAY'}
  </div>
);

type ClearProps = {
  clearSelection: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Clear = ({ clearSelection }: ClearProps) => (
  <div
    style={{ ...buttonStyle, background: 'sandybrown' }}
    onClick={clearSelection}
  >
    CLEAR
  </div>
);

const PianoRoll = () => {
  const [selection, select, isPlaying, play, pause, clear] = useDrumMachine();

  const togglePlaying = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        <Play isPlaying={isPlaying} togglePlaying={togglePlaying} />
        <Clear clearSelection={clear} />
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
