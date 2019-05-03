import React, { useCallback } from 'react';
import { Instrument, playSound } from '../../lib/useDrumMachine';
import Beat from '../Beat';

type RollProps = {
  instrument: Instrument;
  beats: Array<boolean>;
  select: (instrument: Instrument, n: number, value: boolean) => void;
};

const Roll = ({ instrument, beats, select }: RollProps) => {
  const previewSound = useCallback(() => {
    playSound(instrument);
  }, [instrument]);

  const handleClick = useCallback(
    event => {
      previewSound();

      const { id } = event.target;
      const n = parseInt(id);
      select(instrument, n, !beats[n]);
    },
    [previewSound, select, instrument, beats]
  );

  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '120px',
          height: '60px',
          background: 'lightgrey',
          margin: '1px'
        }}
        onClick={previewSound}
      >
        {instrument}
      </div>
      {beats.map((isActive, i) => (
        <Beat isActive={isActive} onClick={handleClick} id={`${i}`} key={i} />
      ))}
    </div>
  );
};

export default Roll;
