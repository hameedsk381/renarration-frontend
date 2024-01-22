import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const Annotator = ({ open, onClose, content, onSave, initialDescription = '' }) => {
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    // Set the description to the initialDescription whenever the dialog is opened
    // or the initialDescription changes
    if (open) {
      setDescription(initialDescription);
    }
  }, [open, initialDescription]);

  const handleSave = () => {
    if (!description.trim()) {
      alert('Please enter a description.'); // or use a more sophisticated validation/error message approach
      return;
    }

    onSave(content, description); // Call the onSave function passed from the parent component
    onClose(); // Close the dialog after onSave is called
  };

  const handleClose = () => {
    onClose(); // Close the dialog
    setDescription(''); // Clear the description when the dialog is closed
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Add Annotation</DialogTitle>
      <DialogContent>
        <div style={{ margin: '20px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        </div>
        <TextField
          label="Description/Notes"
          multiline
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Annotator;
