import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, TextField, Container,
  Paper, Dialog, DialogContentText,
  DialogContent, DialogTitle, DialogActions,
  Stack,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { Add, ContentCopy, ExitToApp } from '@mui/icons-material';
import { resetState } from '../redux/actions/urlActions';
import { resetAnnotations } from '../redux/actions/annotationActions';
import { getAllSweets, submitApi } from '../apis/extractApis';
import BlockListing from './BlockListing';
import { addRennarationId, addRennarationTitle } from '../redux/actions/rennarationActions';
import { showSnackbar } from '../redux/actions/snackbarActions.js';

import { closeModal, openModal } from '../redux/actions/modalActions.js';
import Confirmation from '../utils/Confirmation.jsx';
import SweetSearch from './SweetSearch.jsx';
import processAnnotatedBlocks from '../utils/processAnnotatedBlocks.js';

function RenarrationList() {
  const navigate = useNavigate();

  const renarratedBlocks = useSelector((state) => state.annotation.annotatedBlocks);
  const [modalOpen, setModalOpen] = useState(false);
  const [sharingIdText, setSharingId] = useState('');
  const [type, setType] = useState('');
  const dispatch = useDispatch();
  const renarrationTitle = useSelector((state) => state.renarration.renarrationTitle);
  const renarrationId = useSelector((state) => state.renarration.renarrationId);
const [loading,setLoading] = useState(false);
  const displaySnackbar = (message, type) => {
    dispatch(showSnackbar(message, type));
  };

  const submitNewRenarration = async (requestBody) => {
    try {
      // console.log(requestBody)
      const response = await axios.post(submitApi, requestBody, {
        headers: { 'Content-Type': 'application/json' },
      });
      handlePostSubmission(response.data);
    } catch (error) {
      displaySnackbar('Error submitting renarration', 'error');
      // console.error(error.message);
    }
  };

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

  const handlePostSubmission = (data) => {
    displaySnackbar(data.message, 'success');

    if (data.sharingId) {
      setModalOpen(true);
      setSharingId(data.sharingId);
    }
    dispatch(resetState());
    dispatch(resetAnnotations());
    dispatch(addRennarationTitle(''));
    dispatch(addRennarationId(''));
    localStorage.clear();
  };

  const handleModalClose = () => {
    setModalOpen(false);
    downloadSharingId(sharingIdText);
    dispatch(resetState());
    dispatch(resetAnnotations());
    dispatch(addRennarationTitle(''));
    dispatch(addRennarationId(''));
    localStorage.clear();
    navigate('/');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sharingIdText);
    displaySnackbar('sharing ID copied successfully', 'success');
    handleModalClose();
  };

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
    dispatch(openModal(<Confirmation type="exit" />));
  };

  const handleNext = async () => {
    setLoading(true);
    if (!renarrationTitle.trim()) {
      displaySnackbar('Please give the title to renarration', 'info');
      setLoading(false);
      return;
    }

    if (renarrationId === '') {
      dispatch(openModal(
        <Confirmation
          type="sweetType"
          onConfirm={async (selectedType) => {
            setType(selectedType);
            dispatch(closeModal());

            const requestBody = {
              renarrationTitle,
              type: selectedType,
              annotations: await processAnnotatedBlocks(renarratedBlocks),
            };

            await submitNewRenarration(requestBody);
            setLoading(false);
          }}
        />
      ));
    } else {
      const requestBody = {
        renarrationTitle,
        annotations: await processAnnotatedBlocks(renarratedBlocks),
      };

      await updateRenarration(requestBody);
      setLoading(false);
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ width: '100%', p: 4, my: 2 }}>
        <Container maxWidth='md'>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent={'space-between'}>
            <Button variant="contained" sx={{ textTransform: 'initial' }} startIcon={<Add />} onClick={() => { navigate('/re-narrate'); }}> Add more annotations</Button>
            <SweetSearch />
          </Stack>
          <TextField
            label="Sweet Title"
            placeholder='Give the title that describes the context of your sweet. Example: Explaining what fundamental rights are to a 5 year old'
            value={renarrationTitle}
            onChange={(e) => dispatch(addRennarationTitle(e.target.value))}
            margin="normal"
            required
            fullWidth
            sx={{ mt: 4 }}
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
        <Button variant='outlined' endIcon={<ExitToApp />} onClick={handleExit} color="error" sx={{ mx: { xs: 3, md: '8%' }, fontSize: { xs: 8, md: 14 } }}>
          exit sweet creation
        </Button>
        <Button sx={{ mx: { xs: 3, md: '8%' }, fontSize: { xs: 8, md: 14 } }} variant="contained" onClick={handleNext} disabled={renarratedBlocks.length === 0} color="success">{loading ? <CircularProgress color='inherit'/> : 'Publish sweet'}</Button>
      </Stack>
    </>
  );
}

export default RenarrationList;
