import React from 'react';
import { Instrument } from '../../lib/useDrumMachine';
import CustomizablePianoRoll from '../CustomizablePianoRoll';
import useTour from '../../lib/useTour';
import Tutorial from '../shared/Tutorial';

const steps = [
  {
    selector: '',
    content: `This is the 6th tutorial in this series. We're going to do something a little different this time. In all the previous beats we used snares/claps but now we're going to use just kick drums!`
  },
  {
    selector: '.kick-2 .preview',
    content: 'As you can see now you have the second kick drum.'
  },
  {
    selector: '.kick-2 .pitch',
    content: `Let's change its' pitch to around 11:55 (almost 12 o'clock, but a little to the left - we want this kick's pitch an octave above the original)`
  },
  {
    selector: '.tempo-knob',
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
    selector: '',
    content: `That's it! No, really, that's it! Nike says: "just do it" and you "just did it"! Great beat man, great beat :d`
  }
];

const Tutorial3Pitch = () => {
  const { isTourOpen, closeTour, step, changeStep } = useTour();

  const instruments = [
    Instrument.OpenHat,
    Instrument.ClosedHat,
    Instrument.Shaker,
    Instrument.Rimshot,
    Instrument.Kick,
    Instrument.Kick2
  ];
  return (
    <div>
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
      />
    </div>
  );
};

export default Tutorial3Pitch;
