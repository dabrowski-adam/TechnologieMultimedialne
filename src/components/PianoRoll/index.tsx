import React from 'react';
import { Instrument } from '../../lib/useDrumMachine';
import CustomizablePianoRoll from '../CustomizablePianoRoll';

const PianoRoll = () => {
  const allInstruments = Object.values(Instrument).map(
    instrument => instrument as Instrument
  );
  return (
    <CustomizablePianoRoll
      enableTempo
      enablePitch
      instruments={allInstruments}
    />
  );
};

export default PianoRoll;
