import {
  Button, Container, Grid, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import RenarrationBlock from './RenarrationBlock';

function AnnotatedBlocks() {
  const navigate = useNavigate();
  const { annotatedBlocks } = useSelector((state) => state.annotation);

  return (
    <Container maxWidth="lg">
      <Button variant="contained" sx={{ my: 2 }} color="primary" startIcon={<ArrowBack />} onClick={() => { navigate('/re-narrate'); }}>
        Back to Annotate
      </Button>
      <Typography gutterBottom sx={{ marginY: 4, textAlign: 'center', '@media (max-width: 600px)': { fontSize: '2rem' } }}>
        Annotated Blocks
      </Typography>

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
