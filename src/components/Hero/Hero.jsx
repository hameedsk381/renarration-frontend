import React from 'react';
import {
  Container, Typography, TextField, Button, Box,
} from '@mui/material';

function Hero() {
  return (
    <Box sx={{ backgroundColor: 'background.customBackground' }}>
      <Container maxWidth="sm" sx={{ justifyContent: 'center', alignItems: 'center', pb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Welcome to Web Re-narration
        </Typography>
        <Typography variant="h4" gutterBottom>
          Read. Re-narrate. Share.
        </Typography>
        {/* <Typography paragraph>
        A Web framework for contributing alternative narratives to Web content and to compose renarrations based on the user's literacy level or reading-comfort preferences.
      </Typography> */}

      </Container>
    </Box>
  );
}

export default Hero;
