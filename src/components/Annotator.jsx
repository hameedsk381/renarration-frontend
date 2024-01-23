import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const Annotator = ({ open, onClose, content, onSave }) => {


  const handleSave = () => {


    onSave(content); // Call the onSave function passed from the parent component
    onClose(); // Close the dialog after onSave is called
  };

  const handleClose = () => {
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Add Annotation</DialogTitle>
      <DialogContent>
        <div style={{ margin: '20px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        </div>
        {/* <TextField
          label="Description/Notes"
          multiline
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>ADD</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Annotator;
