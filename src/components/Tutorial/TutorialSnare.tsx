import React, { useCallback, useState } from 'react';
import { Instrument, OnChangePassedState } from '../../lib/useDrumMachine';
import CustomizablePianoRoll from '../CustomizablePianoRoll';
import useTour from '../../lib/useTour';
import Tutorial from '../shared/Tutorial';
import equals from 'ramda/es/equals';

const steps = [
  {
    selector: '',
    content: `OK, I said the last beat was the basic modern beat. But did you know that beats can be kick-driven and snare-driven? The last one was kick-driven but with this one we're going to make a snare-driven beat`
  },
  {
    selector: '.tempo',
    content: `First off, let's adjust the tempo so it's around 70BPM (just like in last tutorial)`
  },
  {
    selector: '.play',
    content: `Click the play button`
  },
  {
    selector: '',
    content: `So, having said that we're going to create a snare-driven beat - let's start with the snares`
  },
  {
    selector: '.snare',
    content: `Put them on the 5th, 8th, 10th, 13th and 16th step`
  },
  {
    selector: '',
    content: `And now we're going to add kick drums. It's important that they work well with snares - think about them like a perfect married couple :d`
  },
  {
    selector: '.kick',
    content: `Put them on the 1st, 4th, 7th, 11th and 14th step`
  },
  {
    selector: '',
    content: `Notice the feel of the beat is very different now - it might be even hard say what's the backbeat (although it is in there)`
  },
  {
    selector: '.closed-hat',
    content: `The last thing we're going to add are hi-hats. Please put them on steps 1-16`
  },
  {
    selector: '',
    content: `Great! And now you have a snare-driven beat! You can go and tell everyone or you can also go to our next tutorial :d One other tip I have for you is: try muting some hi-hats now that the beat is finished and listen to what this does to the feel of the beat.`
  }
];

const TutorialSnare = () => {
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
        (step === 1 && tempo < 72 && tempo > 68) ||
        (step === 4 &&
          equals(selection.Snare, [
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            true,
            false,
            true,
            false,
            false,
            true,
            false,
            false,
            true
          ])) ||
        (step === 6 &&
          equals(selection.Kick, [
            true,
            false,
            false,
            true,
            false,
            false,
            true,
            false,
            false,
            false,
            true,
            false,
            false,
            true,
            false,
            false
          ])) ||
        (step === 8 && selection['Closed Hat'].every(selected => selected))
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
      }
    },
    [isObserving, step, nextStep]
  );

  const instruments = [Instrument.ClosedHat, Instrument.Snare, Instrument.Kick];
  return (
    <div onClick={observeClicks}>
      <CustomizablePianoRoll
        enableTempo
        instruments={instruments}
        nextRoute={isNextVisible ? '/tutorial/perc1' : undefined}
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

export default TutorialSnare;
