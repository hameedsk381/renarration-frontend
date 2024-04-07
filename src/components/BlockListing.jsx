import React from 'react';
import RenarrationBlock from './RenarrationBlock';
import { Grid, Paper, Stack } from '@mui/material';
import DraggableList from './DraggableList';

function BlockListing({ blocks }) {
  const renarratedBlocks = blocks;



  return (
    <Stack  variant='outlined' my={5} p={2} >

  
        <Grid container spacing={2}>
          {renarratedBlocks && renarratedBlocks.map((block,index) => (
            <Grid item key={index}>
              <RenarrationBlock block={block} editing />
            </Grid>
          ))}
        </Grid>
    
     {/* <DraggableList/> */}
    </Stack>
  );
}

export default BlockListing;
