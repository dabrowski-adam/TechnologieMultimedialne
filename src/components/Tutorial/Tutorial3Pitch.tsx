import React from 'react';
import { Instrument } from '../../lib/useDrumMachine';
import CustomizablePianoRoll from '../CustomizablePianoRoll';
import useTour from '../../lib/useTour';
import Tutorial from '../shared/Tutorial';

const steps = [
  {
    selector: '.kick .pitch',
    content: 'You can also change the pitch of your instruments.'
  },
  {
    selector: '.clap .pitch',
    content: 'You can also change the pitch of your instruments.'
  }
];

const Tutorial3Pitch = () => {
  const { isTourOpen, closeTour, step, changeStep } = useTour();

  const instruments = [
    Instrument.OpenHat,
    Instrument.ClosedHat,
    Instrument.Clap,
    Instrument.Kick
  ];
  return (
    <div>
      <CustomizablePianoRoll
        instruments={instruments}
        enableTempo
        enablePitch
        nextRoute={'/tutorial/instruments'}
      />
      <Tutorial
        steps={steps}
        isTourOpen={isTourOpen}
        closeTour={closeTour}
        step={step}
        changeStep={changeStep}
      />
    </div>
  );
};

export default Tutorial3Pitch;
