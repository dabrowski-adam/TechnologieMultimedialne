import React from 'react';
import { Knob } from 'react-rotary-knob';

type PitchProps = {
  value: number;
  onChange: (value: number) => void;
};

const MIN_PITCH = 0.5;
const MAX_PITCH = 2;

const Pitch = ({ value, onChange }: PitchProps) => (
  <div
    style={{
      display: 'flex',
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      width: '60px',
      background: 'lightskyblue',
      margin: '1px'
    }}
  >
    <Knob
      value={value}
      onChange={onChange}
      min={MIN_PITCH}
      max={MAX_PITCH}
      unlockDistance={0}
      preciseMode={false}
    />
  </div>
);

export default Pitch;
