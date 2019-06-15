import React from 'react';
import { Instrument } from '../../lib/useDrumMachine';
import CustomizablePianoRoll from '../CustomizablePianoRoll';

const Tutorial3Pitch = () => {
  const instruments = [
    Instrument.OpenHat,
    Instrument.ClosedHat,
    Instrument.Clap,
    Instrument.Kick
  ];
  return (
    <CustomizablePianoRoll instruments={instruments} enableTempo enablePitch />
  );
};

export default Tutorial3Pitch;
