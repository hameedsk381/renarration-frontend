import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Modal, Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sharingIdApi } from '../apis/extractApis';
import { addAnnotatedBlocks } from '../redux/actions/annotationActions';
import { addRennarationId, addRennarationTitle } from '../redux/actions/rennarationActions';


function EditRenarrationModal({ isOpen, onClose, renarrationId }) {
  const [sharingId, setSharingId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModalClose = () => {
    if (!isSubmitting) {
      onClose();
      setError('');
    }
  };

  const handleSharingIdChange = (event) => {
    setSharingId(event.target.value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(sharingIdApi, { sharingId, renarrationId });
      if (response.data) {
        dispatch(addAnnotatedBlocks(response.data.blocks));
        dispatch(addRennarationTitle(response.data.renarrationTitle));
        dispatch(addRennarationId(renarrationId));
        navigate('/create-rennaration'); // Adjust the route as necessary
        onClose(); // Close the modal after successful submission
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit sharing ID.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleModalClose}
      aria-labelledby="edit-renarration-modal-title"
      aria-describedby="edit-renarration-modal-description"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{
        width: '90%',
        maxWidth: 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
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
          <Button onClick={handleModalClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" disabled={isSubmitting}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditRenarrationModal;
