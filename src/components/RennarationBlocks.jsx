import { Button, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom'
import RenarrationBlock from './RenarrationBlock';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const RennarationBlocks = () => {
    const navigate = useNavigate();
    const {renarrationBlocks} = useSelector(state=>state.renarrationBlocks);
  return (
    <Container maxWidth="lg">
    <Typography variant="h4" component="h1" gutterBottom sx={{ marginY: 4 }}>
        Renarration Blocks
    </Typography>
  
    <Stack direction={'row'} justifyContent={'space-between'}>
    <Button variant="contained" color="primary" startIcon={<ArrowBack />} onClick={()=>{ navigate('/re-narrate')}}>
        Back to Renarrate
    </Button>
    <Button variant='contained' onClick={()=>{navigate('/view-rennaration')}} endIcon={<ArrowForward/>}>View Re-narration</Button>
    </Stack>
    <Grid container spacing={4} sx={{ marginTop: 2 }}>
        {renarrationBlocks && renarrationBlocks.map(block => (
            <Grid item key={block.id} xs={12} md={6} lg={4}>
               <RenarrationBlock block={block}/>
            </Grid>
        ))}
    </Grid>
</Container>
  )
}

export default RennarationBlocks