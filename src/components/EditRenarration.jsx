import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Modal, Box, Typography, TextField, Button, Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sharingIdApi } from '../apis/extractApis';
import { addAnnotatedBlocks } from '../redux/actions/annotationActions';
import { addRennarationId, addRennarationTitle } from '../redux/actions/rennarationActions';
import { closeModal } from '../redux/actions/modalActions';

function EditRenarration({  renarrationId }) {
  const [sharingId, setSharingId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModalClose = () => {
    if (!isSubmitting) {
   dispatch(closeModal());
      setError('');
    }
  };

  const handleSharingIdChange = (event) => {
    setSharingId(event.target.value);
  };

  const handleSubmit = async () => {
    if(sharingId === '')
    {
      setError('please enter your shring id');
      return
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post(sharingIdApi, { sharingId, renarrationId });
      if (response.data) {
        dispatch(addAnnotatedBlocks(response.data.annotations));
        dispatch(addRennarationTitle(response.data.renarrationTitle));
        dispatch(addRennarationId(renarrationId));
        dispatch(closeModal());
        navigate('/create-rennaration'); // Adjust the route as necessary
      }
    } catch (error) {
      if (error.message === 'Network Error') {
        setError('Check your internet connection...or server is down try again after sometime');
      } else {
        setError('Opps! You have entered a wrong ID. Try again please');
      }
      // console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  
      <>
        <Typography id="edit-renarration-modal-title" variant="h6" component="h2">
          Enter Sharing ID
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          margin="normal"
          required
          fullWidth
          id="sharingId"
          label="Sharing ID"
          name="sharingId"
          autoComplete="sharingId"
          autoFocus
          value={sharingId}
          onChange={handleSharingIdChange}
          disabled={isSubmitting}
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button color='error' onClick={handleModalClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button color='success' onClick={handleSubmit}  disabled={isSubmitting}>
            Submit
          </Button>
        </Box>
      </>
 
  );
}

export default EditRenarration;
