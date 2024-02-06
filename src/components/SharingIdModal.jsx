import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Alert } from '@mui/material';

const SharingIDModal = ({ open, onClose, onSubmit ,response , idVerifyStatus}) => {
  const [sharingId, setSharingId] = useState('');

  const handleSubmit = () => {
    onSubmit(sharingId);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enter Sharing ID</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="sharingId"
          label="Sharing ID"
          type="text"
          fullWidth
          variant="standard"
          value={sharingId}
          onChange={(e) => setSharingId(e.target.value)}
        />
    {  idVerifyStatus && <Alert sx={{my:2}} severity="error">{response}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SharingIDModal;
