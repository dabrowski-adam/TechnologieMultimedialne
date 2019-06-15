import React from 'react';
import { Instrument } from '../../lib/useDrumMachine';
import CustomizablePianoRoll from '../CustomizablePianoRoll';

const Tutorial2Tempo = () => {
  const instruments = [
    Instrument.OpenHat,
    Instrument.ClosedHat,
    Instrument.Clap,
    Instrument.Kick
  ];
  return <CustomizablePianoRoll instruments={instruments} enableTempo />;
};

export default Tutorial2Tempo;
