import React, { useCallback, useState } from 'react';
import { Instrument, OnChangePassedState } from '../../lib/useDrumMachine';
import CustomizablePianoRoll from '../CustomizablePianoRoll';
import useTour from '../../lib/useTour';
import Tutorial from '../shared/Tutorial';
import equals from 'ramda/es/equals';

const steps = [
  {
    selector: '',
    content: `This the 4th tutorial in this series. We're going to build off the 2nd one but now you get to use new instruments - percussion or perc for short`
  },
  {
    selector: '.tempo',
    content: `But first things first, let's set the tempo to around 77.`
  },
  {
    selector: '.play',
    content: `Click the play button`
  },
  {
    selector: '',
    content: `OK, I said we're going to use some percs, now let's hear them.`
  },
  {
    selector: '.triangle .preview',
    content: `This is the triangle`
  },
  {
    selector: '.triangle',
    content: `Let's put it on the 3rd and 11th step`
  },
  {
    selector: '.rimshot .preview',
    content: `This is the 808 rimshot`
  },
  {
    selector: '.rimshot',
    content: `This one we're going to put on 4th and 10th step so it works with the triangle`
  },
  {
    selector: '.cowbell .preview',
    content: `And this is and 808 cowbell (which is obviously very different from a real cowbell..)`
  },
  {
    selector: '.cowbell',
    content: `This one we're going to put just on 16th step`
  },
  {
    selector: '',
    content: `OK, as far as percussion goes that's really it. The three is all we need! Right now, onto the hats`
  },
  {
    selector: '.closed-hat',
    content: `We're going to draw the usual full-length 16-note pattern`
  },
  {
    selector: '',
    content: `Sounds awesome! Now we're going to add the clap and the kick`
  },
  {
    selector: '.clap',
    content: `Put clap on 5th and 13th step`
  },
  {
    selector: '.kick',
    content: `Now put kick on 1st and 11th step`
  },
  {
    selector: '',
    content: `Great! And now your drum beat is finished. You can go onto the next one`
  }
];

const TutorialPerc1 = () => {
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
        (step === 1 && tempo < 79 && tempo > 75) ||
        (step === 5 &&
          equals(selection.Triangle, [
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
            false,
            false,
            false
          ])) ||
        (step === 7 &&
          equals(selection.Rimshot, [
            false,
            false,
            false,
            true,
            false,
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
            false
          ])) ||
        (step === 9 &&
          equals(selection.Cowbell, [
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
          ])) ||
        (step === 11 && selection['Closed Hat'].every(selected => selected)) ||
        (step === 13 &&
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
        (step === 14 &&
          equals(selection.Kick, [
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
            true,
            false,
            false,
            false,
            false,
            false
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
      if (step === 2 && className === 'play') {
        nextStep();
      } else if (step === 4 && className === 'preview') {
        nextStep();
      } else if (step === 6 && className === 'preview') {
        nextStep();
      } else if (step === 8 && className === 'preview') {
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
    Instrument.Triangle,
    Instrument.Rimshot,
    Instrument.Cowbell
  ];
  return (
    <div onClick={observeClicks}>
      <CustomizablePianoRoll
        enableTempo
        instruments={instruments}
        nextRoute={isNextVisible ? '/tutorial/perc2' : undefined}
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

export default TutorialPerc1;
