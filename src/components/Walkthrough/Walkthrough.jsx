import { Box, Typography } from '@mui/material';
import React from 'react';
import StepperComp from '../Stepper/Stepper';

function Walkthrough() {
  return (
    <Box mt={4} p={5} sx={{ backgroundColor: 'white' }}>
      <Typography variant="h6" gutterBottom>
        How it works?
      </Typography>
      <StepperComp />
    </Box>
  );
}

export default Walkthrough;
