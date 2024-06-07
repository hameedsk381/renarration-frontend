import React, {  useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button,  TextField,  Container, 
  Paper, Dialog, DialogContentText,
   DialogContent, DialogTitle, DialogActions,
    Stack,
} from '@mui/material';
import axios from 'axios';
import { Add, ArrowBack, ContentCopy, ExitToApp } from '@mui/icons-material';
import { resetState } from '../redux/actions/urlActions';
import { resetAnnotations } from '../redux/actions/annotationActions';
import { getAllSweets, submitApi } from '../apis/extractApis';
import BlockListing from './BlockListing';
import { addRennarationId, addRennarationTitle } from '../redux/actions/rennarationActions';
import { showSnackbar } from '../redux/actions/snackbarActions.js';
import processRenarratedBlocks from '../utils/processRenarratedBlocks.js';
import { openModal } from '../redux/actions/modalActions.js';
import Confirmation from '../utils/Confirmation.jsx';
import SweetSearch from './SweetSearch.jsx';
import ImageUploadComponent from './ImageUploadComponent.jsx';
import AudioUploadComponent from './AudioUploadComponent.jsx';

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
    console.log(requestBody)
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
      const response = await axios.put(`${getAllSweets}/${renarrationId}`, requestBody, {
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
    dispatch(resetState());
    dispatch(resetAnnotations());
    dispatch(addRennarationTitle(''));
    dispatch(addRennarationId(''));
    localStorage.clear(); // Clear local storage
    navigate('/');
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
    dispatch(openModal(<Confirmation/>));
  };
  const handleNext = async () => {
    // Validation checks
    if (!renarrationTitle.trim()) {
      displaySnackbar('Please give the title to renarration', 'info');
      return;
    }
    const requestBody = {
      renarrationTitle,
      annotations: await processRenarratedBlocks(renarratedBlocks),
    };
    // Submit the data
    renarrationId === '' ? await submitNewRenarration(requestBody) : await updateRenarration(requestBody);

    // Move to the next step if not the final logic
  };

 




  return (
   <>
    <Container
     

     maxWidth="lg"
     sx={{
       width: '100%', p: 4, my: 2,
     }}
   >
   
     <Container maxWidth='md'>
     <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent={'space-between'}>
       <Button variant="contained" sx={{textTransform:'initial'}} startIcon={<Add />} onClick={() => { navigate('/re-narrate'); }}> Add more annotations</Button>
     <SweetSearch/>
     </Stack>
       <TextField 
         label="Sweet Title"
         placeholder='Give the title that describes the context of your sweet. '
         value={renarrationTitle}
         onChange={(e) => dispatch(addRennarationTitle(e.target.value))}
         margin="normal"
         required
         fullWidth
         sx={{mt:4}}
       />

     </Container>
    
     <BlockListing blocks={renarratedBlocks} />

   
    
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
   <Stack direction={'row'} justifyContent={'space-between'} position={'fixed'} bottom={0} width={'100%'} bgcolor={'white'} py={2} component={Paper} elevation={5}>
   <Button variant='outlined' endIcon={<ExitToApp />} onClick={handleExit} color="error" sx={{mx:{xs:3,md:'8%'},fontSize:{xs:8,md:14}}}>
              exit sweet creation
            </Button>
            <Button sx={{mx:{xs:3,md:'8%'},fontSize:{xs:8,md:14}}} variant="contained" onClick={handleNext} disabled={renarratedBlocks.length === 0} color="success">Publish Sweet</Button>
   </Stack>
   </>
  );
}

export default RenarrationList;
