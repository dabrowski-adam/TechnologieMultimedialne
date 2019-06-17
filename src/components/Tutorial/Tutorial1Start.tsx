import React, { useCallback, useState } from 'react';
import { Instrument } from '../../lib/useDrumMachine';
import CustomizablePianoRoll from '../CustomizablePianoRoll';
import useTour from '../../lib/useTour';
import Tutorial from '../shared/Tutorial';

const steps = [
  {
    selector: '',
    content: `Hi! Welcome to our drum machine. We're going to teach you how to make some serious drum beats :d`
  },
  {
    selector: '.kick .preview',
    content: `First off, let's start with the basics: the electronic drum kit consists of dozen or so synthesized drum sounds. The most basic ones are: the kick (click on it to check how it sounds)`
  },
  {
    selector: '.snare .preview',
    content: `The snare`
  },
  {
    selector: '.clap .preview',
    content: `The clap`
  },
  {
    selector: '.closed-hat .preview',
    content: `And the hi-hat`
  },
  {
    selector: '',
    content: `Great! This four sounds are enough to make our first beat. The type of beat we're going to make is called four-on-the-floor. Let's start with the kick drums!`
  },
  {
    selector: '.kick .beat-0',
    content: `Click here to put the kick on a first beat`
  },
  {
    selector: '.kick .beat-4',
    content: `And the second one`
  },
  {
    selector: '.kick .beat-8',
    content: `And the third one`
  },
  {
    selector: '.kick .beat-12',
    content: `And the fourth one`
  },
  {
    selector: '.play',
    content: `Great! And now you have four kicks for four-on-the-floor beat! Press play to hear what you've just created`
  },
  {
    selector: '',
    content: `OK, sounding pretty good right now. But it's not finished yet. So now we're going to add in the snares`
  },
  {
    selector: '.snare .beat-4',
    content: `(I) They're going to be on the second and fourth beat`
  },
  {
    selector: '.snare .beat-12',
    content: `(II) They're going to be on the second and fourth beat`
  },
  {
    selector: '',
    content: `Great! Notice how our drums started going back-and-forth. The beats where you put your snares on are called the backbeat. The next thing we're going to add are claps`
  },
  {
    selector: '.clap .beat-4',
    content: `(I) Put them right under your snares`
  },
  {
    selector: '.clap .beat-12',
    content: `(II) Put them right under your snares`
  },
  {
    selector: '',
    content: `Perfect! What you've just done is called layering. It's one of key concepts in creating good sounding drum beats. It's when you layer two (or more) different drum sounds to achieve a new single sound. You can layer many different sounds together but in this example we're layered a snare and a clap to make a snareclap`
  },
  {
    selector: '',
    content: `Right now the beat sounds pretty much done but we're going to add one more thing. We're going to put hi-hats on all the steps from 1 to 16 just to fill-in some space and add some top-end`
  },
  {
    selector: '.closed-hat',
    content: `Please put them on steps 1-16`
  },
  {
    selector: '.next',
    content: `Great! And now the beat is finished. You can go and impress girls with it or click here to go to the next tutorial :d`
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
        } else if (step === 2 && className === 'preview') {
          changeStep(step + 1);
        } else if (step === 3 && className === 'preview') {
          changeStep(step + 1);
        } else if (step === 4 && className === 'preview') {
          changeStep(step + 1);
        } else if (step === 6 && className === 'beat-0') {
          changeStep(step + 1);
        } else if (step === 7 && className === 'beat-4') {
          changeStep(step + 1);
        } else if (step === 8 && className === 'beat-8') {
          changeStep(step + 1);
        } else if (step === 9 && className === 'beat-12') {
          changeStep(step + 1);
        } else if (step === 10 && className === 'play') {
          changeStep(step + 1);
        } else if (step === 12 && className === 'beat-4') {
          changeStep(step + 1);
        } else if (step === 13 && className === 'beat-12') {
          changeStep(step + 1);
        } else if (step === 15 && className === 'beat-4') {
          changeStep(step + 1);
        } else if (step === 16 && className === 'beat-12') {
          changeStep(step + 1);
        } else if (step === 19) {
          changeStep(step + 1);
        } else if (step === 20 && className === 'next') {
          changeStep(step + 1);
        }
      }
    },
    [isObserving, step, changeStep]
  );

  const instruments = [
    Instrument.ClosedHat,
    Instrument.Snare,
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
