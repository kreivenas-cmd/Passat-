import { useState } from 'react';
import { useOBDConnection } from './useOBDConnection';

const ADAPTATION_STEPS = [
  { progress: 0, message: 'Prisijungimas prie greičių dėžės valdymo bloko...' },
  { progress: 15, message: 'Nuskaitomi dabartiniai adaptacijos parametrai...' },
  { progress: 30, message: 'Išvalomi senieji adaptacijos duomenys...' },
  { progress: 45, message: 'Inicializuojama nauja adaptacija...' },
  { progress: 60, message: 'Nustatomi pradiniai parametrai...' },
  { progress: 75, message: 'Atliekamas sistemos patikrinimas...' },
  { progress: 90, message: 'Išsaugomi nauji parametrai...' },
  { progress: 100, message: 'Adaptacija užbaigta sėkmingai!' },
];

export function useTransmissionAdaptation() {
  const [isAdapting, setIsAdapting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState('');
  const { sendCommand } = useOBDConnection();

  const startAdaptation = async () => {
    setIsAdapting(true);
    setProgress(0);
    setCurrentStep(0);

    for (let i = 0; i < ADAPTATION_STEPS.length; i++) {
      const step = ADAPTATION_STEPS[i];
      setCurrentStep(i);
      setStatus(step.message);
      setProgress(step.progress);

      try {
        await performAdaptationStep(i);
      } catch (error) {
        console.error('Adaptation step error:', error);
        setStatus('Klaida adaptacijos metu');
        setIsAdapting(false);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    setIsAdapting(false);
  };

  const performAdaptationStep = async (step: number): Promise<void> => {
    switch (step) {
      case 0:
        await sendCommand('ATSP6');
        break;
      case 1:
        await sendCommand('0902');
        break;
      case 2:
        await sendCommand('04');
        break;
      case 3:
        await sendCommand('1001');
        break;
      case 4:
        await sendCommand('1002');
        break;
      case 5:
        await sendCommand('0100');
        break;
      case 6:
        await sendCommand('1003');
        break;
      case 7:
        await sendCommand('01');
        break;
      default:
        break;
    }
  };

  const resetAdaptation = () => {
    setProgress(0);
    setCurrentStep(0);
    setStatus('');
    setIsAdapting(false);
  };

  return {
    isAdapting,
    progress,
    currentStep,
    status,
    startAdaptation,
    resetAdaptation,
  };
}
