import React from 'react';
import RenarrationBlock from './RenarrationBlock';
import { Container, Grid, Paper, Stack } from '@mui/material';
import DraggableList from './DraggableList';

function BlockListing({ blocks }) {
  const renarratedBlocks = blocks;



  return (
    <Stack  variant='outlined' mb={5}  >

        <Container  maxWidth='md' spacing={2}>
          {renarratedBlocks && renarratedBlocks.map((block,index) => (
            <RenarrationBlock block={block} editing key={index}/>
          ))}
        </Container>
    
     {/* <DraggableList/> */}
    </Stack>
  );
}

export default BlockListing;
