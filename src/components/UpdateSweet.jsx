import {
  Button, Container, Grid, Stack, Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import RenarrationBlock from './RenarrationBlock';

function UpdateSweet() {
  const data = useLocation();
  const annotatedBlocks = data.state;
  useEffect(() => {
    // console.log(annotatedBlocks)
  }, []);
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ marginY: 4 }}>
        Annotated Blocks
      </Typography>

      <Stack direction="row" justifyContent="space-between">
        <Button variant="contained" color="primary" startIcon={<ArrowBack />} onClick={() => { navigate('/re-narrate'); }}>
          Back to Annotate
        </Button>
        {annotatedBlocks.length !== 0 && <Button variant="contained" onClick={() => { navigate('/view-rennaration'); }} endIcon={<ArrowForward />}>View Re-narration</Button>}
      </Stack>
      <Grid container spacing={4} sx={{ marginTop: 2 }}>
        {annotatedBlocks && annotatedBlocks.map((block) => (
          <Grid item key={block.id} xs={12} md={6} lg={4}>
            <RenarrationBlock block={block} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default UpdateSweet;
