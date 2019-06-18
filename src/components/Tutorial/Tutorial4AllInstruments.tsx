import React from 'react';
import { Instrument } from '../../lib/useDrumMachine';
import CustomizablePianoRoll from '../CustomizablePianoRoll';

const Tutorial4AllInstruments = () => {
  const allInstruments = Object.values(Instrument).map(
    instrument => instrument as Instrument
  );
  return (
    <CustomizablePianoRoll
      instruments={allInstruments}
      enableTempo
      enablePitch
      enableQuantization
    />
  );
};

export default Tutorial4AllInstruments;
