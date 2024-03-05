import {
  Button, Container, Grid, Stack, Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import RenarrationBlock from './RenarrationBlock';

function AnnotatedBlocks() {
  const navigate = useNavigate();
  const { annotatedBlocks } = useSelector((state) => state.annotation);
  useEffect(() => {
    // console.log(annotatedBlocks);
  }, []);
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ marginY: 4 ,textAlign:"center"}}>
        Annotated Blocks
      </Typography>

      <Stack direction="row" justifyContent="space-between">
        <Button variant="contained" color="primary" startIcon={<ArrowBack />} onClick={() => { navigate('/re-narrate'); }}>
          Back to Annotate
        </Button>

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

export default AnnotatedBlocks;

