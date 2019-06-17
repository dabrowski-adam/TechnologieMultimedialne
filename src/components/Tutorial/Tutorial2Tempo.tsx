import React, { useCallback, useState } from 'react';
import { equals } from 'ramda';
import { Instrument, OnChangePassedState } from '../../lib/useDrumMachine';
import CustomizablePianoRoll from '../CustomizablePianoRoll';
import useTour from '../../lib/useTour';
import Tutorial from '../shared/Tutorial';

const steps = [
  {
    selector: '',
    content: `Now let's make another beat! The one we're going to create in this tutorial is like the basic modern beat`
  },
  {
    selector: '',
    content: `Let's start with the hats. `
  },
  {
    // 2
    selector: '.closed-hat',
    content: `And just like in previous one, please put them on steps 1-16`
  },
  {
    // 3
    selector: '.open-hat .preview',
    content: `Great! And now we're going to add the new instrument - open hat. Click on it to hear how it sounds`
  },
  {
    // 4
    selector: '.open-hat .beat-2',
    content: `(I/II) We're going to place them so they lead into 2nd and 4th beat`
  },
  {
    // 5
    selector: '.open-hat .beat-10',
    content: `(II/II) We're going to place them so they lead into 2nd and 4th beat`
  },
  {
    // 6
    selector: '.play',
    content: `Press play to hear what you've done so far sounds like`
  },
  {
    selector: '',
    content: `OK, now add the snare and the clap - by now you should now what we're doing`
  },
  {
    // 8
    selector: '.snare .beat-4',
    content: `(I/II) Snare`
  },
  {
    // 9
    selector: '.snare .beat-12',
    content: `(I/II) Plus`
  },
  {
    // 10
    selector: '.clap .beat-4',
    content: `(I/II) Clap...`
  },
  {
    // 11
    selector: '.clap .beat-12',
    content: `(II/II) Equals snareclap!`
  },
  {
    selector: '',
    content: `Cool! Now we're going to add kick drums. They're going to be placed differently this time around`
  },
  {
    // 13
    selector: '.kick',
    content: `Place kick drums at beats 1, 4, 7, 10, 11 and 15. `
  },
  {
    selector: '.tempo-value',
    content: `Great! Now you've added all instruments that we're going to use in this beat. Notice this little number here. This is the current tempo of your track, counted in beats per minute. Value of 120BPM means that the beat beats every 0,5s. Four on the floor beat (the one from last tutorial) had 4 beats in a measure. This one also has 4 beats in a measure`
  },
  {
    // 15
    selector: '.tempo',
    content: `Change the tempo so it's around 70BPM`
  },
  {
    selector: '',
    content: `Great! And now the beat is done! You might go to the next tutorial to learn more about constructing drum beats :D`
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

  const [isObserving, setIsObserving] = useState<boolean>(false);

  const onChange = useCallback(
    (state: OnChangePassedState) => {
      if (!isObserving) {
        return;
      }
      const { selection, tempo } = state;
      if (
        (step === 2 && selection['Closed Hat'].every(selected => selected)) ||
        (step === 4 && selection['Open Hat'][2]) ||
        (step === 5 && selection['Open Hat'][10]) ||
        (step === 8 && selection.Snare[4]) ||
        (step === 9 && selection.Snare[12]) ||
        (step === 10 && selection.Clap[4]) ||
        (step === 11 && selection.Clap[12]) ||
        (step === 13 &&
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
            true,
            true,
            false,
            false,
            false,
            true,
            false
          ])) ||
        (step === 15 && (tempo > 65 && tempo < 75))
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
      if (
        (step === 3 && className === 'preview') ||
        (step === 6 && className === 'play')
      ) {
        nextStep();
      }
    },
    [isObserving, step, nextStep]
  );

  const instruments = [
    Instrument.OpenHat,
    Instrument.ClosedHat,
    Instrument.Snare,
    Instrument.Clap,
    Instrument.Kick
  ];
  return (
    <div onClick={observeClicks}>
      <CustomizablePianoRoll
        instruments={instruments}
        enableTempo
        nextRoute={isNextVisible ? '/tutorial/snare' : undefined}
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

export default Tutorial2Tempo;
