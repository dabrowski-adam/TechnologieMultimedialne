import React from 'react';
import { Instrument } from '../../lib/useDrumMachine';
import CustomizablePianoRoll from '../CustomizablePianoRoll';

const Tutorial4AllInstruments = () => {
  const allInstruments = Object.keys(Instrument).map(
    instrument => instrument as Instrument
  );
  return <CustomizablePianoRoll instruments={allInstruments} enableTempo />;
};

export default Tutorial4AllInstruments;
