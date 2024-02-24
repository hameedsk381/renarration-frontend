import { Step, StepLabel, Stepper } from '@mui/material';
import { motion } from 'framer-motion';

// Array of step strings
const steps = ['Enter URL', 'Choose Narration Style', 'Preview', 'Share'];

// Example step with animation
function AnimatedStep({ label }) {
  return (
    <Step>
      <StepLabel>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {label}
        </motion.div>
      </StepLabel>
    </Step>
  );
}
function StepperComp() {
  return (
    <Stepper activeStep={-1} orientation="horizontal">
      {
  steps.map((label, index) => (
    <AnimatedStep key={label} label={label} />
  ))
}
    </Stepper>
  );
}

export default StepperComp;
