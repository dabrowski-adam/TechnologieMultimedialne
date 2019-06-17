import React, { useCallback, useState } from 'react';
import { Instrument, OnChangePassedState } from '../../lib/useDrumMachine';
import CustomizablePianoRoll from '../CustomizablePianoRoll';
import useTour from '../../lib/useTour';
import Tutorial from '../shared/Tutorial';

const steps = [
  {
    selector: '',
    content: `This is the 6th tutorial in this series. We're going to do something a little different this time. In all of previous beats we used snares/claps but now we're going to use just kick drums!`
  },
  {
    selector: '.kick-2 .preview',
    content: 'As you can see now you have the second kick drum'
  },
  {
    selector: '.kick-2 .pitch',
    content: `Let's change its' pitch to around 11:50 (a little to the left from 12 o'clock). It's going to be around an octave higher now`
  },
  {
    selector: '.tempo',
    content: `Great! Now let's set the tempo to 100.`
  },
  {
    selector: '',
    content: `And we're ready to put down a beat. We're going to start with two kick drums - again they're married, just like the snare and the kick in earlier tutorial, remember?`
  },
  {
    selector: '.kick .beat-0',
    content: `(I/IV) The first kick goes here`
  },
  {
    selector: '.kick .beat-4',
    content: `(II/IV) Here`
  },
  {
    selector: '.kick .beat-8',
    content: `(III/IV) Here`
  },
  {
    selector: '.kick .beat-12',
    content: `(IV/IV) And here`
  },

  {
    selector: '.kick-2 .beat-3',
    content: `(I/IV) The second one goes here`
  },
  {
    selector: '.kick-2 .beat-6',
    content: `(II/IV) Here`
  },
  {
    selector: '.kick-2 .beat-11',
    content: `(III/IV) Here`
  },
  {
    selector: '.kick-2 .beat-14',
    content: `(IV/IV) And here`
  },
  {
    selector: '.play',
    content: `Press play so we can listen to them!`
  },
  {
    selector: '',
    content: `Pretty cool, huh? Now the beat's foundation is in place. It sounds solid and it won't fold down or collapse randomly. But but...we're going to add little embelishments to make it sound even fuller! Let's move along`
  },
  {
    selector: '.shaker .beat-3',
    content: `(I/IV) First goes the shaker`
  },
  {
    selector: '.open-hat .beat-8',
    content: `(II/IV) Then the open hat`
  },
  {
    selector: '.rimshot .beat-14',
    content: `(III/IV) Rimshot`
  },
  {
    selector: '.closed-hat .beat-15',
    content: `(IV/IV) ..and a little hi-hat`
  },
  {
    selector: '.next',
    content: `That's it! No, really, that's it! And just like that, "you just did it"! Great beat man, great beat :d`
  }
];

const Tutorial3Pitch = () => {
  const { isTourOpen, closeTour, step, changeStep, nextStep } = useTour();

  const [isObserving, setIsObserving] = useState<boolean>(false);

  const onChange = useCallback(
    (state: OnChangePassedState) => {
      if (!isObserving) {
        return;
      }
      const { selection, tempo } = state;
      if (step === 1 && tempo < 102 && tempo > 98) {
        nextStep();
      }
    },
    [isObserving, step, nextStep]
  );

  const observeClicks = useCallback(
    e => {
      if (isObserving) {
        const { className } = e.target;
        if (step === 1 && className === 'preview') {
          changeStep(step + 1);
        } else if (step === 2) {
          changeStep(step + 1);
        } else if (step === 3) {
          changeStep(step + 1);
        } else if (step === 5 && className === 'beat-0') {
          changeStep(step + 1);
        } else if (step === 6 && className === 'beat-4') {
          changeStep(step + 1);
        } else if (step === 7 && className === 'beat-8') {
          changeStep(step + 1);
        } else if (step === 8 && className === 'beat-12') {
          changeStep(step + 1);
        } else if (step === 9 && className === 'beat-3') {
          changeStep(step + 1);
        } else if (step === 10 && className === 'beat-6') {
          changeStep(step + 1);
        } else if (step === 11 && className === 'beat-11') {
          changeStep(step + 1);
        } else if (step === 12 && className === 'beat-14') {
          changeStep(step + 1);
        } else if (step === 13 && className === 'play') {
          changeStep(step + 1);
        } else if (step === 15 && className === 'beat-3') {
          changeStep(step + 1);
        } else if (step === 16 && className === 'beat-8') {
          changeStep(step + 1);
        } else if (step === 17 && className === 'beat-14') {
          changeStep(step + 1);
        } else if (step === 18 && className === 'beat-15') {
          changeStep(step + 1);
        } else if (step === 19 && className === 'next') {
          changeStep(step + 1);
        }
      }
    },
    [isObserving, step, changeStep]
  );

  const instruments = [
    Instrument.OpenHat,
    Instrument.ClosedHat,
    Instrument.Shaker,
    Instrument.Rimshot,
    Instrument.Kick,
    Instrument.Kick2
  ];
  return (
    <div onClick={observeClicks}>
      <CustomizablePianoRoll
        instruments={instruments}
        enableTempo
        enablePitch
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

export default Tutorial3Pitch;
