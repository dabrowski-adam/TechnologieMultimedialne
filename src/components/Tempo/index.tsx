import React from 'react';
import { Knob } from 'react-rotary-knob';

type TempoProps = {
  value: number;
  onChange: (value: number) => void;
};

const MIN_TEMPO = 20;
const MAX_TEMPO = 200;

const Tempo = ({ value, onChange }: TempoProps) => (
  <div
    style={{
      display: 'flex',
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
      min={MIN_TEMPO}
      max={MAX_TEMPO}
      unlockDistance={0}
      preciseMode={false}
    />
  </div>
);

export default Tempo;
