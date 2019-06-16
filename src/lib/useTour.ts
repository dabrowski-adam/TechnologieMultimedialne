import { useCallback, useState } from 'react';

const useTour = (onStepChange?: (step: number) => void) => {
  const [isTourOpen, setIsTourOpen] = useState<boolean>(true);
  const closeTour = useCallback(() => {
    setIsTourOpen(false);
  }, [setIsTourOpen]);

  const [step, setStep] = useState<number>(0);

  const changeStep = useCallback(
    n => {
      onStepChange(n);
      setStep(n);

      // If we can't move forward we've reached the end
      if (step !== 0 && step === n) {
        closeTour();
      }
    },
    [setStep, step, closeTour, onStepChange]
  );

  const nextStep = useCallback(() => {
    changeStep(step + 1);
  }, [step, changeStep]);

  return { isTourOpen, closeTour, step, changeStep, nextStep };
};

export default useTour;
