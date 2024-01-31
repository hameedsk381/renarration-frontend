import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const Annotator = ({ open, onClose, content, onSave }) => {
  const handleSave = () => {
    onSave(content); // Call the onSave function passed from the parent component
    onClose(); // Close the modal after onSave is called
  };

  const handleClose = () => {
    onClose(); // Close the modal
  };

  // Custom style for the modal
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%', // Adjust the width as needed
    maxHeight: '80vh', // Adjust the max height as needed
    overflowY: 'auto', // Allow vertical scrolling
    bgcolor: 'background.paper',
    border: '1px solid #ccc',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="annotator-modal-title"
      aria-describedby="annotator-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="annotator-modal-title" variant="h6" component="h2">
          Add Annotation
        </Typography>
        <Box id="annotator-modal-description" sx={{ mt: 2 }}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Box>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button sx={{ mr: 1 }} onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>ADD</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Annotator;
