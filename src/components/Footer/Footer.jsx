import React from 'react';
import {
  Box, Container, Typography, Link,
} from '@mui/material';

function Footer() {
  return (
    <Box sx={{
      bgcolor: '#C1BEBE',
      py: 3,
      bottom: 0,
      left: 0,
      right: 0,
    }}
    >
      <Container maxWidth="lg">
        <Typography align="center" gutterBottom>
          A Web framework for contributing alternative narratives to Web content and to compose renditions based on the user's literacy level or reading-comfort preferences. Re-narration Web is modeled as a distributed social networking for the purpose of making Web-content available for a person who is not comfortable reading text or for a person in a foreign context. Individuals contributing to alternative narratives is the key aspect of re-narration Web.

          An individual can choose to provide alternative narration to any specific entity such as an image, a paragraph or subtitles for a segment of a video and such.

          The idea of the re-narration Web is to provide a person visiting a Web page, a comfortable narrative of the page content based on the visitor profile and contributions of alternative narratives made available by the community.
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
          {'© '}
          <Link color="inherit" href="https://yourwebsite.com/">
            SWeets
          </Link>
          {' '}
          {new Date().getFullYear()}
          .
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
