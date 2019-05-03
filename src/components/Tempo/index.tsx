import React, { useState, useCallback } from 'react';
import { Knob } from 'react-rotary-knob';

type TempoProps = {
  updateTempo: (value: number) => void;
};

const Tempo = ({ updateTempo }: TempoProps) => {
  const [value, setValue] = useState(0);
  const handleOnChange = useCallback(
    val => {
      setValue(val);
      console.log(val);
    },
    [setValue]
  );

  return (
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
        onChange={handleOnChange}
        min={20}
        max={200}
        unlockDistance={0}
        preciseMode={false}
        width={200}
        height={200}
      />
    </div>
  );
};

export default Tempo;
