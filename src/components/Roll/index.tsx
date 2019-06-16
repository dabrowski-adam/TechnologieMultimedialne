import React, { useCallback, useState } from 'react';
import { Instrument, playSound } from '../../lib/useDrumMachine';
import Beat from '../Beat';
import Pitch from '../Pitch';

type RollProps = {
  instrument: Instrument;
  beats: Array<boolean>;
  select: (instrument: Instrument, n: number, value: boolean) => void;
  isPlaying: boolean;
  setPitch: (instrument: Instrument, pitch: number) => void;
  currentBeat: number;
  updateMouseDown: (
    beat: number,
    instrument: Instrument,
    value: boolean
  ) => void;
  updateMouseUp: (beat: number, instrument: Instrument) => void;
  mouseEnter: (beat: number, instrument: Instrument) => void;
  mouseLeave: (beat: number, instrument: Instrument) => void;
  selectionRange: { instrument: Instrument; range: number[] };
  enablePitch: boolean;
};

const Roll = ({
  instrument,
  beats,
  select,
  isPlaying,
  setPitch,
  currentBeat,
  updateMouseDown,
  updateMouseUp,
  mouseEnter,
  mouseLeave,
  selectionRange,
  enablePitch
}: RollProps) => {
  const previewSound = useCallback(() => {
    playSound(instrument);
  }, [instrument]);

  const handleClick = useCallback(
    event => {
      if (!isPlaying) {
        previewSound();
      }

      const { id } = event.target;
      const n = parseInt(id);
      select(instrument, n, !beats[n]);
    },
    [previewSound, select, instrument, beats, isPlaying]
  );

  const handleInstrumentClick = useCallback(() => {
    if (isPlaying) {
      select(instrument, null, true);
    } else {
      previewSound();
    }
  }, [previewSound, select, instrument, isPlaying]);

  // Hacky, TODO: Move this state to useDrumMachine maybe
  const [pitchState, setPitchState] = useState(0);
  const updatePitch = useCallback(
    value => {
      setPitchState(value);
      setPitch(instrument, value);
    },
    [setPitch, instrument]
  );

  const handleMouseDown = (beat: number) => {
    updateMouseDown(beat, instrument, !beats[beat]);
  };

  const handleMouseUp = (beat: number) => {
    updateMouseUp(beat, instrument);
  };

  const handleMouseEnter = (beat: number) => {
    mouseEnter(beat, instrument);
  };

  const handleMouseLeave = (beat: number) => {
    mouseLeave(beat, instrument);
  };

  return (
    <div
      style={{ display: 'flex', flex: 1 }}
      className={instrument.replace(' ', '-').toLowerCase()}
    >
      {enablePitch && <Pitch value={pitchState} onChange={updatePitch} />}
      <div
        style={{
          display: 'flex',
          flexShrink: 0,
          alignItems: 'center',
          justifyContent: 'center',
          width: '121px',
          height: '60px',
          background: 'lightgrey',
          margin: '1px',
          userSelect: 'none',
          marginLeft: 'auto'
        }}
        onClick={handleInstrumentClick}
        className="preview"
      >
        {instrument}
      </div>
      {beats.map((isActive, i) => (
        <Beat
          isActive={isActive}
          isRangeSelected={
            instrument === selectionRange.instrument
              ? selectionRange.range.includes(i)
              : false
          }
          onClick={handleClick}
          id={`${i}`}
          // eslint-disable-next-line eqeqeq
          isPlaying={currentBeat == i}
          updateMouseDown={handleMouseDown}
          updateMouseUp={handleMouseUp}
          mouseEnter={handleMouseEnter}
          mouseLeave={handleMouseLeave}
          key={i}
        />
      ))}
    </div>
  );
};

export default Roll;
