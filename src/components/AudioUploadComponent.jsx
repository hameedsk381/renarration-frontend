import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, ListItem, ListItemIcon, ListItemText, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import DeleteIcon from '@mui/icons-material/Delete';

const AudioUploadComponent = ({ onDrop, file }) => {
    const [openDialog, setOpenDialog] = useState(false);

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop: (acceptedFiles) => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                const newFile = {
                    ...acceptedFiles[0],
                    preview: URL.createObjectURL(acceptedFiles[0])
                };
                onDrop(newFile); // Use the onDrop prop to handle the new file
            }
        },
        maxFiles: 1,
        noClick: true,  // Disable automatic dialog opening when clicking on the dropzone
        accept: 'audio/*'
    });

    const handleDelete = () => {
        if (file && file.preview) {
            URL.revokeObjectURL(file.preview);
        }
        onDrop(null); // Pass null to onDrop to indicate no file
        setOpenDialog(false); // Close the confirmation dialog
    };

    const handleDeleteDialog = () => {
        setOpenDialog(true);
    };

    useEffect(() => {
        // Cleanup the preview URL when the component unmounts or the file changes
        return () => {
            if (file && file.preview) {
                URL.revokeObjectURL(file.preview);
            }
        };
    }, [file]);

    return (
        <Box {...getRootProps()} sx={{ border: '2px dashed gray', padding: 3, textAlign: 'center', mt: 2 }}>
            <input {...getInputProps()} accept='audio/*' />
            <Typography variant="body2">Drag 'n' drop an audio file here, or click to select a file</Typography>
            {file ? (
                <>
                    <Button variant="outlined" onClick={open} sx={{ mt: 2 }}>Replace Audio</Button>
                    <ListItem>
                        <ListItemIcon>
                            <AudiotrackIcon />
                        </ListItemIcon>
                        <ListItemText primary={file.path} />
                        <audio controls src={file.preview} style={{ width: '100%' }} />
                        <IconButton onClick={handleDeleteDialog} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                </>
            ) : (
                <Button variant="outlined" onClick={open} sx={{ mt: 2 }}>Upload Audio</Button>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this audio?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AudioUploadComponent;
