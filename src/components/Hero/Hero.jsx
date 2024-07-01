import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Stack, Button
} from '@mui/material';
import HomeTabs from '../HomeTabs';

function Hero() {
  

  return (
    <Box>
      <Stack  my={2} spacing={2}>
        <Typography color="text.primary" variant="h6" gutterBottom>
          Welcome to Web of Semantic Web Entities
        </Typography>
        <Typography color="text.primary" variant="h4" gutterBottom>
          Annotate. Sweet. Re-narrate.
        </Typography>
        <HomeTabs/>
      </Stack>
      
    </Box>
  );
}

export default Hero;
