import React, { useCallback, useState } from 'react';
import { Instrument } from '../../lib/useDrumMachine';
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
    selector: '.closed-hat',
    content: `And just like in previous one, please put them on steps 1-16`
  },
  {
    selector: '.open-hat .preview',
    content: `Great! And now we're going to add the new instrument - open hat. Click on it to hear how it sounds`
  },
  {
    selector: '.open-hat .beat-2',
    content: `(I/II) We're going to place them so they lead into 2th and 4th beat`
  },
  {
    selector: '.open-hat .beat-10',
    content: `(II/II) We're going to place them so they lead into 2th and 4th beat`
  },
  {
    selector: '.play',
    content: `Press play to hear what you've done so far sounds like`
  },
  {
    selector: '',
    content: `OK, now add the snare and the clap - by now you should now what we're doing`
  },
  {
    selector: '.snare .beat-4',
    content: `(I/II) Snare`
  },
  {
    selector: '.snare .beat-12',
    content: `(I/II) Plus`
  },
  {
    selector: '.clap .beat-4',
    content: `(I/II) Clap...`
  },
  {
    selector: '.clap .beat-12',
    content: `(II/II) Equals snareclap!`
  },
  {
    selector: '',
    content: `Cool! Now we're going to add kick drums. They're going to be placed differently this time around`
  },
  {
    selector: '.kick .beat-0',
    content: `(I/VI) Kick drum goes here`
  },
  {
    selector: '.kick .beat-3',
    content: `(II/VI) And here`
  },
  {
    selector: '.kick .beat-6',
    content: `(III/VI) And here`
  },
  {
    selector: '.kick .beat-9',
    content: `(IV/VI) And here`
  },
  {
    selector: '.kick .beat-10',
    content: `(V/VI) And here`
  },
  {
    selector: '.kick .beat-14',
    content: `(VI/VI) And the last one goes here`
  },
  {
    selector: '.tempo-value',
    content: `Great! Now you've added all instruments that we're going to use in this beat. Notice this little number here. This is the current tempo of your track, counted in beats per minute. Value of 120BPM means that the beat beats every 0,5s. Four on the floor beat (the one from last tutorial) had 4 beats in a measure. This one also has 4 beats in a measure`
  },
  {
    selector: '.tempo-knob',
    content: `Change the tempo so it's around 70BPM`
  },
  {
    selector: '.next',
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
  const observeClicks = useCallback(
    e => {
      if (isObserving) {
        const { className } = e.target;
        if (step === 2) {
          changeStep(step + 1);
        } else if (step === 3 && className === 'preview') {
          changeStep(step + 1);
        } else if (step === 4 && className === 'beat-2') {
          changeStep(step + 1);
        } else if (step === 5 && className === 'beat-10') {
          changeStep(step + 1);
        } else if (step === 6 && className === 'play') {
          changeStep(step + 1);
        } else if (step === 8 && className === 'beat-4') {
          changeStep(step + 1);
        } else if (step === 9 && className === 'beat-12') {
          changeStep(step + 1);
        } else if (step === 10 && className === 'beat-4') {
          changeStep(step + 1);
        } else if (step === 11 && className === 'beat-12') {
          changeStep(step + 1);
        } else if (step === 13 && className === 'beat-0') {
          changeStep(step + 1);
        } else if (step === 14 && className === 'beat-3') {
          changeStep(step + 1);
        } else if (step === 15 && className === 'beat-6') {
          changeStep(step + 1);
        } else if (step === 16 && className === 'beat-9') {
          changeStep(step + 1);
        } else if (step === 17 && className === 'beat-10') {
          changeStep(step + 1);
        } else if (step === 18 && className === 'beat-14') {
          changeStep(step + 1);
        } else if (step === 20) {
          changeStep(step + 1);
        } else if (step === 21 && className === 'next') {
          changeStep(step + 1);
        }
      }
    },
    [isObserving, step, changeStep]
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
        nextRoute={isNextVisible ? '/tutorial/pitch' : undefined}
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
