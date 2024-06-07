import React from 'react';
import {
  Box, Container, Typography, Link, Grid,
} from '@mui/material';

function RenarrationInfo() {
  return (
   
     <Container sx={{justifyContent:'center',alignItems:'center',mt:4}}>
       <Grid   sx={{maxWidth:'1152px'}} container spacing={2}>
        <Grid item xs={12} lg={5} alignContent={'center'} justifyItems={'center'}>
          <Typography fontSize={'26px'} fontWeight={'semibold'} color={'#0069D2'}  maxHeight={112} align="center" gutterBottom>
            What is  Web Re-narration?
          </Typography>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Typography textAlign={'justify'} my={2} fontSize={16} align="center" gutterBottom>
            A Web framework for contributing alternative narratives to Web content and to compose renditions based on the user's literacy level or reading-comfort preferences. Re-narration Web is modeled as a distributed social networking for the purpose of making Web-content available for a person who is not comfortable reading text or for a person in a foreign context. Individuals contributing to alternative narratives is the key aspect of re-narration Web.
          </Typography>
          <Typography textAlign={'justify'} my={2} fontSize={16}> An individual can choose to provide alternative narration to any specific entity such as an image, a paragraph or subtitles for a segment of a video and such.</Typography>
        <Typography textAlign={'justify'} my={2} fontSize={16}> The idea of the re-narration Web is to provide a person visiting a Web page, a comfortable narrative of the page content based on the visitor profile and contributions of alternative narratives made available by the community.</Typography>
        </Grid>
      </Grid>
     </Container>
    
  );
}

export default RenarrationInfo;
