import React from 'react';
import Tour, { Arrow } from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

type TutorialProps = {
  steps: any[];
  isTourOpen: boolean;
  step?: number;
  changeStep?: (n: number) => void;
  closeTour: () => void;
  setIsObserving?: (p: boolean) => void;
  nextStep?: () => void;
};

const Tutorial = ({
  steps,
  isTourOpen,
  step,
  nextStep,
  changeStep,
  closeTour,
  setIsObserving
}: TutorialProps) => (
  <Tour
    steps={steps}
    isOpen={isTourOpen}
    goToStep={step || undefined}
    getCurrentStep={changeStep || undefined}
    onRequestClose={closeTour}
    nextStep={nextStep || undefined}
    onAfterOpen={target => {
      disableBodyScroll(target);
      if (setIsObserving) {
        setIsObserving(true);
      }
    }}
    onBeforeClose={target => {
      enableBodyScroll(target);
      if (setIsObserving) {
        setIsObserving(false);
      }
    }}
    lastStepNextButton={<Arrow inverted onClick={() => {}} />}
    closeWithMask={false}
    disableKeyboardNavigation={['esc']}
    showCloseButton={false}
    showNavigation={false}
    showNavigationNumber={false}
    showNumber={false}
    maskSpace={0}
    accentColor="lightskyblue"
    maskClassName="tour-mask"
  />
);

export default Tutorial;
