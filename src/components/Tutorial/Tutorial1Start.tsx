import React, { useCallback, useState } from 'react';
import { Instrument } from '../../lib/useDrumMachine';
import CustomizablePianoRoll from '../CustomizablePianoRoll';
import useTour from '../../lib/useTour';
import Tutorial from '../shared/Tutorial';

const steps = [
  {
    selector: '',
    content: `Let's make some music!`
  },
  {
    selector: '.kick .preview',
    content: 'Click on the instrument name to check out the sound it makes.'
  },
  {
    selector: '.kick .beat-0',
    content: 'Now click click here to select a note.'
  },
  {
    selector: '.kick .beat-4',
    content: 'Select a few more to make a beat...'
  },
  {
    selector: '.kick .beat-8',
    content: '...and another one...'
  },
  {
    selector: '.kick .beat-12',
    content: '...and the last one.'
  },
  {
    selector: '.play',
    content: 'Now click play to hear the rhythm!'
  },
  {
    selector: '.next',
    content: 'You can now go to the next tutorial.'
  }
];

const Tutorial1Start = () => {
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

  const [isObserving, setIsObserving] = useState<boolean>(false);
  const observeClicks = useCallback(
    e => {
      if (isObserving) {
        const { className } = e.target;
        if (step === 1 && className === 'preview') {
          changeStep(step + 1);
        } else if (step === 2 && className === 'beat-0') {
          changeStep(step + 1);
        } else if (step === 3 && className === 'beat-4') {
          changeStep(step + 1);
        } else if (step === 4 && className === 'beat-8') {
          changeStep(step + 1);
        } else if (step === 5 && className === 'beat-12') {
          changeStep(step + 1);
        } else if (step === 6 && className === 'play') {
          changeStep(step + 1);
        }
      }
    },
    [isObserving, step, changeStep]
  );

  const instruments = [
    Instrument.OpenHat,
    Instrument.ClosedHat,
    Instrument.Clap,
    Instrument.Kick
  ];
  return (
    <div onClick={observeClicks}>
      <CustomizablePianoRoll
        instruments={instruments}
        nextRoute={isNextVisible ? '/tutorial/tempo' : undefined}
      />
      <Tutorial
        steps={steps}
        isTourOpen={isTourOpen}
        closeTour={closeTour}
        step={step}
        changeStep={changeStep}
        nextStep={nextStep}
        setIsObserving={setIsObserving}
      />
    </div>
  );
};

export default Tutorial1Start;
