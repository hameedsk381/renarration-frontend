import React from 'react';
import RenarrationBlock from './RenarrationBlock';
import { Container, Grid, Paper, Stack } from '@mui/material';
import DraggableList from './DraggableList';

function BlockListing({ blocks }) {
  const renarratedBlocks = blocks;



  return (
    <Container  maxWidth='md' spacing={2} sx={{mb:5}}>
    {renarratedBlocks && renarratedBlocks.map((block,index) => (
      <RenarrationBlock block={block} editing key={index}/>
    ))}
  </Container>
  );
}

export default BlockListing;
