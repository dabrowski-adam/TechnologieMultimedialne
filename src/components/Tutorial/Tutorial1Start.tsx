import React from 'react';
import { Instrument } from '../../lib/useDrumMachine';
import CustomizablePianoRoll from '../CustomizablePianoRoll';

const Tutorial1Start = () => {
  const instruments = [
    Instrument.OpenHat,
    Instrument.ClosedHat,
    Instrument.Clap,
    Instrument.Kick
  ];
  return <CustomizablePianoRoll instruments={instruments} />;
};

export default Tutorial1Start;
