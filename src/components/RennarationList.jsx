import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Stepper, Step, StepLabel, TextField, Snackbar, Alert, Container, Paper, Dialog, DialogContentText, DialogContent, DialogTitle, DialogActions,
} from '@mui/material';
import axios from 'axios';
import { ContentCopy } from '@mui/icons-material';
import { resetState } from '../redux/actions/urlActions';
import { resetAnnotations } from '../redux/actions/annotationActions';
import { getAllRenarrations, submitApi } from '../apis/extractApis';
import AnnotatedBlocks from './AnnotatedBlocks';
import BlockListing from './BlockListing';
import { addRennarationId, addRennarationTitle } from '../redux/actions/rennarationActions';
import { setTheme } from '../redux/actions/themeActions.js';
import { showSnackbar } from '../redux/actions/snackbarActions.js';

function RenarrationList() {
  const navigate = useNavigate();

  const renarratedBlocks = useSelector((state) => state.annotation.annotatedBlocks);
  const [modalOpen, setModalOpen] = useState(false); // State for controlling modal open/close
  const [sharingIdText, setSharingId] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const renarrationTitle = useSelector((state) => state.renarration.renarrationTitle);
  const renarrationId = useSelector((state) => state.renarration.renarrationId);
  const steps = ['Create Renarration', 'Submit Renarration'];
  const displaySnackbar = (message, type) => {
    dispatch(showSnackbar(message, type));
  };
  const handleNext = async () => {
    // Proceed only if it's the last step
    if (activeStep !== steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      return;
    }

    // Validation checks
    if (!renarrationTitle.trim()) {
      displaySnackbar('Please give the title to renarration', 'info');
      return;
    }

    // Prepare the request body
    const requestBody = prepareRequestBody();

    // Submit the data
    renarrationId === '' ? await submitNewRenarration(requestBody) : await updateRenarration(requestBody);

    // Move to the next step if not the final logic
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Prepare request body
  const prepareRequestBody = () => ({
    renarrationTitle,
    blocks: renarratedBlocks.map((block) => ({
      content: block.content,
      id: block.id,
      desc: block.desc,
      source: block.source,
      renarrationStatus: block.renarrationStatus,
      img: block.img,
      aud: block.aud,
      vid: block.vid,
      ...(block._id && { _id: block._id }), // Include only if _id exists
    })),
  });

  // Submit new renarration
  const submitNewRenarration = async (requestBody) => {
    try {
      const response = await axios.post(submitApi, requestBody, {
        headers: { 'Content-Type': 'application/json' },
      });
      handlePostSubmission(response.data);
    } catch (error) {
      displaySnackbar('Error submitting renarration', 'error');
      console.error(error.message);
    }
  };

  // Update existing renarration
  const updateRenarration = async (requestBody) => {
    try {
      const response = await axios.put(`${getAllRenarrations}/${renarrationId}`, requestBody, {
        headers: { 'Content-Type': 'application/json' },
      });
      handlePostSubmission(response.data);
      navigate('/');
    } catch (error) {
      displaySnackbar('Error updating renarration', 'error');
      console.error(error.message);
    }
  };

  // State for storing sharing ID

  const handlePostSubmission = (data) => {
    displaySnackbar(data.message, 'success');

    if (data.sharingId) {
      setTimeout(() => {
        setModalOpen(true); // Open the modal
        setSharingId(data.sharingId); // Set the sharing ID for download
      }, 3000);
    }
    handleExit(); // Assuming this resets the state or navigates away
  };

  const handleModalClose = () => {
    setModalOpen(false); // Close the modal
    downloadSharingId(sharingIdText); // Download the sharing ID
    navigate('/'); // Navigate after modal is closed
  };
  const handleCopy = () => { navigator.clipboard.writeText(sharingIdText); displaySnackbar('sharing ID copied succesfully', 'success'); handleModalClose(); };

  // Download Sharing ID
  const downloadSharingId = (sharingId) => {
    const element = document.createElement('a');
    const file = new Blob([sharingId], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'sharing_id.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleExit = () => {
    dispatch(resetState());
    dispatch(resetAnnotations());
    dispatch(addRennarationTitle(''));
    dispatch(addRennarationId(''));
    dispatch(setTheme('roseGarden'));
    localStorage.clear(); // Clear local storage
    sessionStorage.clear(); // Clear session storage (if you use it)
  };
  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Container maxWidth="lg">
            <AnnotatedBlocks />
          </Container>
        );
      case 1:
        return (
          <>
            <Box>
              <TextField
                label="Renarration Title"
                value={renarrationTitle}
                onChange={(e) => dispatch(addRennarationTitle(e.target.value))}
                margin="normal"
                required
                fullWidth
              />

            </Box>
            <BlockListing blocks={renarratedBlocks} />
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
      <Dialog
        open={modalOpen}
        keepMounted
        onClose={handleModalClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Sharing ID</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {sharingIdText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCopy} startIcon={<ContentCopy />}>
            Copy
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}

export default RenarrationList;
