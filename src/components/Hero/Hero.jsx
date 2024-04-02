import React from 'react';
import {
  Container, Typography, Box,
} from '@mui/material';

function Hero() {
  return (
    <Box >
      <Container maxWidth="sm" sx={{ justifyContent: 'center', alignItems: 'center', pb: 4 }}>
        <Typography color="text.primary" variant="h6" gutterBottom>
          Welcome to Web of Semantic Web Entities
        </Typography>
        <Typography color="text.primary" variant="h4" gutterBottom>
          Read. Re-narrate. Share.
        </Typography>
        <Typography color="text.primary" paragraph>
          A Web framework for contributing alternative narratives to Web content and to compose renarrations based on the user's literacy level or reading-comfort preferences.
        </Typography>

      </Container>
    </Box>
  );
}

export default Hero;
