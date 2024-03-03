import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Card, CardContent, CardMedia, Typography, Grid, Button, Stepper, Step, StepLabel, TextField, Snackbar, Alert, Container, Paper, CardHeader, Stack,
} from '@mui/material';
import { ArrowBack, NearMe } from '@mui/icons-material';
import axios from 'axios';
import extractMedia from '../utils/extractMedia';
import removeMedia from '../utils/removeMedia';
import { resetState } from '../redux/actions/urlActions';
import { resetAnnotations } from '../redux/actions/annotationActions';
import { submitApi } from '../apis/extractApis';
import AnnotatedBlocks from './AnnotatedBlocks';
import RenarrationBlock from './RenarrationBlock';
import BlockListing from './BlockListing';

function RenarrationList() {
  const navigate = useNavigate();

  const renarratedBlocks = useSelector((state) => state.annotation.annotatedBlocks.filter((block) => block.rennarationStatus === true));

  const [activeStep, setActiveStep] = useState(0);
  const [renarrationTitle, setRenarrationTitle] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setsnackbarMsg] = useState('');
  const dispatch = useDispatch();
  const steps = ['Create Renarration', 'Submit Renarration'];

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      if (!renarrationTitle.trim()) {
        setSnackbarOpen(true);
        setsnackbarMsg('Please give the title to renarration ');
        return;
      }
      const requestBody = {
        renarrationTitle,
        blocks: renarratedBlocks.map((block) => ({
          content: block.content,
          id: block.id,
          desc: block.desc,
          source: block.source,
          rennarationStatus: true,
          image: block.img,
          audio: block.aud,
          video: block.vid,
        })),
      };

      try {
        const response = await axios.post(submitApi, requestBody, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // console.log(response.data);
        handleExit();
        setSnackbarOpen(true);
        setsnackbarMsg('Renarration submitted successfully');
        setTimeout(() => navigate('/'), 3000);
      } catch (error) {
        setSnackbarOpen(true);
        setsnackbarMsg('Error submitting renarration:', error.message);
        // console.log(error)
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleExit = () => {
    dispatch(resetState());
    dispatch(resetAnnotations());

    localStorage.clear(); // Clear local storage
    sessionStorage.clear(); // Clear session storage (if you use it)
  };
  const getStepContent = (stepIndex) => {
    const navigate = useNavigate();
    const { annotatedBlocks } = useSelector((state) => state.annotation);
    const rennaratedBlocks = useSelector((state) => state.annotation.annotatedBlocks.filter((block) => block.rennarationStatus === true));

    useEffect(() => {
      // console.log(rennaratedBlocks);

    }, [rennaratedBlocks]);
    switch (stepIndex) {
      case 0:
        return (
          <Container maxWidth="lg">
            <AnnotatedBlocks/>
          </Container>
        );
      case 1:
        return (
          <>
            <Box>
              <TextField
                label="Renarration Title"
                value={renarrationTitle}
                onChange={(e) => setRenarrationTitle(e.target.value)}
                margin="normal"
                required
                fullWidth
              />

            </Box>
            <Box>
              <Typography textAlign="center" variant="h4">{renarrationTitle}</Typography>
            <BlockListing blocks={renarratedBlocks}/>
            </Box>
          </>
        );
    }
  };

  return (
    <Container
      variant="outlined"
      component={Paper}
      maxWidth="lg"
      sx={{
        width: '100%', p: 4, my: 2, backgroundColor: '#f3f3f3',
      }}
    >
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 2 }}>
        {getStepContent(activeStep)}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleNext} disabled={renarratedBlocks.length === 0}>
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default RenarrationList;
