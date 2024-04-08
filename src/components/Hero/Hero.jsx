import React from 'react';
import {
  Container, Typography, Box, Stack,
} from '@mui/material';

function Hero() {
  return (

      <Stack ml={{xs:2,md:20}} my={2}>
        <Typography color="text.primary" variant="h6" gutterBottom>
          Welcome to Web of Semantic Web Entities
        </Typography>
        <Typography color="text.primary" variant="h4" gutterBottom>
          Read. Re-narrate. Share.
        </Typography>
        <Typography color="text.primary" paragraph>
          A Web framework for contributing alternative narratives to Web content and to compose renarrations based on the user's literacy level or reading-comfort preferences.
        </Typography>

      </Stack>
  
  );
}

export default Hero;
