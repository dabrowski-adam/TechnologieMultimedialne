import React, { useCallback, useState } from 'react';
import { Instrument, OnChangePassedState } from '../../lib/useDrumMachine';
import CustomizablePianoRoll from '../CustomizablePianoRoll';
import useTour from '../../lib/useTour';
import Tutorial from '../shared/Tutorial';
import equals from 'ramda/es/equals';

const steps = [
  {
    selector: '',
    content: `This is the 5th tutorial in series. In this tutorial you're going to use some more percussion and also explore some other ways we can put kicks and snares in a pattern.`
  },
  {
    selector: '.tempo',
    content: `OK, we're going to start by altering the tempo to around 96BPM.`
  },
  {
    selector: '.shaker .preview',
    content: `Before we start, this is a shaker. Listen to how it sounds. You're going to use it later on in the pattern.`
  },
  {
    selector: '.play',
    content: `Click the play button`
  },
  {
    selector: '',
    content: `Great! Now, let's start with the kicks`
  },
  {
    selector: '.kick',
    content: `Put kicks on the 1st, 9th, 12th and 13th step`
  },
  {
    selector: '',
    content: `Now onto the snareclaps`
  },
  {
    selector: '.snare',
    content: `Put the snare on 5th and 13th steps`
  },
  {
    selector: '.clap',
    content: `Put the clap on 5th and 13th steps`
  },
  {
    selector: '',
    content: `So far so good. Now let's bring in other instruments.`
  },
  {
    selector: '.open-hat',
    content: `The first goes the open hat. Put it on the 3rd step.`
  },
  {
    selector: '.cowbell',
    content: `Now put cowbell on 4th step.`
  },
  {
    selector: '.rimshot',
    content: `Rimshot on the 15th.`
  },
  {
    selector: '.shaker',
    content: `And shaker on the 16th.`
  },
  {
    selector: '',
    content: `Great! You've just finished the 5th tutorial in this series! Congratulations :d`
  }
];

const TutorialPerc2 = () => {
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

  const onChange = useCallback(
    (state: OnChangePassedState) => {
      if (!isObserving) {
        return;
      }
      const { selection, tempo } = state;
      if (
        (step === 1 && tempo < 98 && tempo > 94) ||
        (step === 5 &&
          equals(selection.Kick, [
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            true,
            true,
            false,
            false,
            false
          ])) ||
        (step === 7 &&
          equals(selection.Snare, [
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            false
          ])) ||
        (step === 8 &&
          equals(selection.Clap, [
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            false
          ])) ||
        (step === 10 &&
          equals(selection['Open Hat'], [
            false,
            false,
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false
          ])) ||
        (step === 11 &&
          equals(selection.Cowbell, [
            false,
            false,
            false,
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false
          ])) ||
        (step === 12 &&
          equals(selection.Rimshot, [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            true,
            false
          ])) ||
        (step === 13 &&
          equals(selection.Shaker, [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            true
          ]))
      ) {
        nextStep();
      }
    },
    [isObserving, step, nextStep]
  );

  const observeClicks = useCallback(
    e => {
      if (!isObserving) {
        return;
      }

      const { className } = e.target;
      if (step === 2 && className === 'preview') {
        nextStep();
      } else if (step === 3 && className === 'play') {
        nextStep();
      }
    },
    [isObserving, step, nextStep]
  );

  const instruments = [
    Instrument.ClosedHat,
    Instrument.Snare,
    Instrument.Clap,
    Instrument.Kick,
    Instrument.Rimshot,
    Instrument.Cowbell,
    Instrument.Shaker,
    Instrument.OpenHat
  ];
  return (
    <div onClick={observeClicks}>
      <CustomizablePianoRoll
        enableTempo
        instruments={instruments}
        nextRoute={isNextVisible ? '/tutorial/pitch' : undefined}
        onChange={onChange}
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

export default TutorialPerc2;
