import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, ListItem, ListItemIcon, ListItemText, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';

const ImageUploadComponent = ({ onDrop, file }) => {
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
        accept: 'image/*'
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
            <input {...getInputProps()} accept='image/*' />
            <Typography variant="body2">Drag 'n' drop an image here, or click to select a file</Typography>
            {file ? (
                <>
                    <Button variant="outlined" onClick={open} sx={{ mt: 2 }}>Replace Image</Button>
                    <ListItem>
                        <ListItemIcon>
                            <ImageIcon />
                        </ListItemIcon>
                        <ListItemText primary={file.path} />
                        <img src={file.preview} alt="Preview" style={{ width: 200, height: 'auto' }} />
                        <IconButton onClick={handleDeleteDialog} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                </>
            ) : (
                <Button variant="outlined" onClick={open} sx={{ mt: 2 }}>Upload Image</Button>
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
                        Are you sure you want to delete this image?
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

export default ImageUploadComponent;
