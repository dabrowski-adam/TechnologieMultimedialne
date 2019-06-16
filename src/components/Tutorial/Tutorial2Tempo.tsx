import React, { useCallback, useState } from 'react';
import { Instrument } from '../../lib/useDrumMachine';
import CustomizablePianoRoll from '../CustomizablePianoRoll';
import useTour from '../../lib/useTour';
import Tutorial from '../shared/Tutorial';

const steps = [
  {
    selector: '',
    content: `Now, let's show you an easy way to change the mood of your track.`
  },
  {
    selector: '.tempo-value',
    content:
      'This is the current tempo of your track, denoted in Beats Per Minute.'
  },
  {
    selector: '.tempo-knob',
    content: 'You can play around with the knob to change the tempo.'
  }
];

const Tutorial2Tempo = () => {
  const [isNextVisible, setIsNextVisible] = useState<boolean>(false);
  const onStepChange = useCallback(
    step => {
      if (step === steps.length - 1) {
        setIsNextVisible(true);
      }
    },
    [setIsNextVisible]
  );

  const { isTourOpen, closeTour, step, changeStep, nextStep } = useTour(
    onStepChange
  );

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
        nextRoute={isNextVisible ? '/tutorial/pitch' : undefined}
      />
      <Tutorial
        steps={steps}
        isTourOpen={isTourOpen}
        closeTour={closeTour}
        step={step}
        changeStep={changeStep}
        nextStep={nextStep}
      />
    </div>
  );
};

export default Tutorial2Tempo;
