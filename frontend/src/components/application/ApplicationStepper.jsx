import { Check } from 'lucide-react';
import { STEPPER_STEPS } from '../../utils/constants';

export default function ApplicationStepper({ currentStep }) {
  return (
    <div className="stepper">
      {STEPPER_STEPS.map((step, index) => {
        const state = index < currentStep ? 'done' : index === currentStep ? 'active' : '';
        return (
          <div key={step.key} className={`stepper-step ${state}`}>
            <div className="stepper-line" />
            <div className="stepper-circle">{index < currentStep ? <Check size={16} /> : index + 1}</div>
            <div className="stepper-label">{step.label}</div>
          </div>
        );
      })}
    </div>
  );
}
