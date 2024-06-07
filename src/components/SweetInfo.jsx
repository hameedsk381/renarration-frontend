import React from 'react';
import {
  Box, Container, Typography, Link, Grid,
} from '@mui/material';

function SweetInfo() {
  return (
    <Container sx={{ justifyContent: 'center', alignItems: 'center',mt:4}}>
      <Grid sx={{ maxWidth: '1152px' }} container spacing={2}>
        <Grid item xs={12} lg={5} alignContent={'center'} justifyItems={'center'}>
          <Typography fontSize={'26px'} fontWeight={'semibold'} color={'#0069D2'} maxHeight={112} align="center" gutterBottom>
            What is a Semantic Web Entity (SWeeT)?
          </Typography>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Typography textAlign={'justify'} my={2} fontSize={16} align="center" gutterBig>
            A Semantic Web Entity, or SWeeT, is a set of annotations made on a web resource that are contextually bound to a meaningful topic. These annotations help impart a semantic meaning to the content, making it more accessible and understandable for users across different linguistic and formal backgrounds.
          </Typography>
          <Typography textAlign={'justify'} my={2} fontSize={16}>
            By providing annotations like simplified summaries, translations, or explanations, SWeeTs help break down language, formality, and vocabulary barriers, enhancing the user's interaction with the content.
          </Typography>
          <Typography textAlign={'justify'} my={2} fontSize={16}>
            This approach not only facilitates a better understanding but also fosters an inclusive web environment where content can be appreciated and understood by a broader audience regardless of their prior knowledge or language skills.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SweetInfo;
