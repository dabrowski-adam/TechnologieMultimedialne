import React, { useCallback, useState } from 'react';
import Tour, { Arrow } from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Instrument } from '../../lib/useDrumMachine';
import CustomizablePianoRoll from '../CustomizablePianoRoll';

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
  const [isTourOpen, setIsTourOpen] = useState<boolean>(true);
  const closeTour = useCallback(() => {
    setIsTourOpen(false);
  }, [setIsTourOpen]);

  const [step, setStep] = useState<number>(0);

  const [isNextVisible, setIsNextVisible] = useState<boolean>(false);
  const changeStep = useCallback(
    n => {
      setStep(n);

      if (step === 5) {
        setIsNextVisible(true);
      }

      // If we can't move forward we've reached the end
      if (step === n) {
        closeTour();
      }
    },
    [setStep, step, closeTour, setIsNextVisible]
  );

  const instruments = [
    Instrument.OpenHat,
    Instrument.ClosedHat,
    Instrument.Clap,
    Instrument.Kick
  ];
  return (
    <>
      <CustomizablePianoRoll
        instruments={instruments}
        nextRoute={isNextVisible ? '/tutorial/tempo' : undefined}
      />
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        goToStep={step}
        getCurrentStep={changeStep}
        onRequestClose={closeTour}
        onAfterOpen={disableBodyScroll}
        onBeforeClose={enableBodyScroll}
        lastStepNextButton={<Arrow inverted onClick={() => {}} />}
        closeWithMask={false}
        disableKeyboardNavigation={['esc']}
        showCloseButton={false}
        showNavigationNumber={false}
        showNumber={false}
        maskSpace={0}
        accentColor="lightskyblue"
      />
    </>
  );
};

export default Tutorial1Start;
