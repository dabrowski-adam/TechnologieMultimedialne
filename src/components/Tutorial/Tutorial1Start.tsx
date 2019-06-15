import React, { useCallback, useState } from 'react';
import Tour from 'reactour';
import { Instrument } from '../../lib/useDrumMachine';
import CustomizablePianoRoll from '../CustomizablePianoRoll';

const steps = [
  {
    selector: '',
    content: `Let's make some music!`
  },
  {
    selector: '.kick',
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
    content: '...'
  },
  {
    selector: '.kick .beat-12',
    content: '...and the last one.'
  },
  {
    selector: '.play',
    content: 'Now click play to hear the rhythm!'
  }
];

const Tutorial1Start = () => {
  const [isTourOpen, setIsTourOpen] = useState(true);
  const closeTour = useCallback(() => {
    setIsTourOpen(false);
  }, [setIsTourOpen]);

  const instruments = [
    Instrument.OpenHat,
    Instrument.ClosedHat,
    Instrument.Clap,
    Instrument.Kick
  ];
  return (
    <>
      <CustomizablePianoRoll instruments={instruments} />
      <Tour steps={steps} isOpen={isTourOpen} onRequestClose={closeTour} />
    </>
  );
};

export default Tutorial1Start;
