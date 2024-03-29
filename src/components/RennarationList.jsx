import React, {  useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button,  TextField,  Container, 
  Paper, Dialog, DialogContentText,
   DialogContent, DialogTitle, DialogActions,
    Stack,
} from '@mui/material';
import axios from 'axios';
import { ArrowBack, ContentCopy } from '@mui/icons-material';
import { resetState } from '../redux/actions/urlActions';
import { resetAnnotations } from '../redux/actions/annotationActions';
import { getAllRenarrations, submitApi } from '../apis/extractApis';
import BlockListing from './BlockListing';
import { addRennarationId, addRennarationTitle } from '../redux/actions/rennarationActions';
import { showSnackbar } from '../redux/actions/snackbarActions.js';
import processRenarratedBlocks from '../utils/processRenarratedBlocks.js';

function RenarrationList() {
  const navigate = useNavigate();

  const renarratedBlocks = useSelector((state) => state.annotation.annotatedBlocks);
  const [modalOpen, setModalOpen] = useState(false); // State for controlling modal open/close
  const [sharingIdText, setSharingId] = useState('');
  const dispatch = useDispatch();
  const renarrationTitle = useSelector((state) => state.renarration.renarrationTitle);
  const renarrationId = useSelector((state) => state.renarration.renarrationId);
  const displaySnackbar = (message, type) => {
    dispatch(showSnackbar(message, type));
  };
 // Submit new renarration
 const submitNewRenarration = async (requestBody) => {
  try {
    const response = await axios.post(submitApi, requestBody, {
      headers: { 'Content-Type': 'application/json' },
    });
    handlePostSubmission(response.data);
    // console.log(response.data)
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
      setModalOpen(true); // Open the modal
      setSharingId(data.sharingId); // Set the sharing ID for download
      // console.log('model opned')
    }
  };
  const handleModalClose = () => {
    setModalOpen(false); // Close the modal
    downloadSharingId(sharingIdText); // Download the sharing ID
    handleExit();
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

  const handleExit = () => {
    dispatch(resetState());
    dispatch(resetAnnotations());
    dispatch(addRennarationTitle(''));
    dispatch(addRennarationId(''));
    navigate('/');
    localStorage.clear(); // Clear local storage
    sessionStorage.clear(); // Clear session storage (if you use it)
  };
  const handleNext = async () => {
    // Validation checks
    if (!renarrationTitle.trim()) {
      displaySnackbar('Please give the title to renarration', 'info');
      return;
    }
    const requestBody = {
      renarrationTitle,
      blocks: await processRenarratedBlocks(renarratedBlocks),
    };
    // Submit the data
    renarrationId === '' ? await submitNewRenarration(requestBody) : await updateRenarration(requestBody);

    // Move to the next step if not the final logic
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
      <Stack direction="row" justifyContent="space-between">
        <Button variant="contained" startIcon={<ArrowBack />} onClick={() => { navigate('/re-narrate'); }}> Back to Annotate</Button>
        <Button variant="contained" onClick={handleExit} disabled={renarratedBlocks.length === 0}>
          Exit Renarration
        </Button>
      </Stack>
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

      <Stack direction="row" justifyContent="flex-end" spacing={1} px={2} pb={2}>
        <Button variant="contained" onClick={handleNext} disabled={renarratedBlocks.length === 0} color="success">Publish</Button>
      </Stack>
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
