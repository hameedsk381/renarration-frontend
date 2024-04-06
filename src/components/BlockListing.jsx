import React from 'react';
import RenarrationBlock from './RenarrationBlock';
import { Grid, Paper, Stack } from '@mui/material';
import DraggableList from './DraggableList';

function BlockListing({ blocks }) {
  const renarratedBlocks = blocks;



  return (
    <Stack component={Paper} variant='outlined' my={5} p={2} >

  
        {renarratedBlocks && renarratedBlocks.map((block,index) => (
          
            <RenarrationBlock block={block} editing/>
        
        ))}
    
     {/* <DraggableList/> */}
    </Stack>
  );
}

export default BlockListing;
