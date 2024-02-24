import {
  Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Snackbar, Alert,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import removeOutlineFromElement from '../utils/removeOutline';
import removeMedia from '../utils/removeMedia';
import extractMedia from '../utils/extractMedia';
import { removeAnnotatedBlock, setAnnotatedHtmlContent } from '../redux/actions/annotationActions';
import { extractPublicId } from '../utils/extractPublicId';
import { serverApi } from '../apis/extractApis';

function RenarrationBlock({ block, noActions }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { htmlforAnnotation } = useSelector((state) => state.annotation);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const deleteBlock = async () => {
    // Dispatch action to delete the block
    dispatch(removeAnnotatedBlock(block.id));
    // Check block for audio, video, and image and delete if not null
    if (block.aud) {
      try {
        const publicId = extractPublicId(block.aud);
        await axios.delete(`${serverApi}/delete/${publicId}`);
        // console.log('media file deleted')
      } catch (error) {
        // console.error('Error deleting audio file:', error);
      }
    }
    if (block.vid) {
      try {
        const publicId = extractPublicId(block.vid);
        await axios.delete(`${serverApi}/delete/${publicId}`);
        // console.log('media file deleted')
      } catch (error) {
        // console.error('Error deleting video file:', error);
      }
    }
    if (block.img) {
      try {
        const publicId = extractPublicId(block.img);
        await axios.delete(`${serverApi}/delete/${publicId}`);
        // console.log('media file deleted')
      } catch (error) {
        // console.error('Error deleting image file:', error);
      }
    }

    // Remove outline from the element in htmlContent
    const updatedHtmlContent = removeOutlineFromElement(htmlforAnnotation, block.id);

    // Optional: Dispatch an action to update the htmlContent in Redux
    dispatch(setAnnotatedHtmlContent(updatedHtmlContent));

    setSnackbarMessage('Block deleted successfully');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card sx={{ borderTop: block.rennarationStatus ? '4px solid green' : '4px solid red' }}>
        <CardMedia>
          <Box sx={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', p: 1,
          }}
          >
            {extractMedia(block.content).map((src, index) => (
              <Box
                key={index}
                component="img"
                sx={{
                  width: '50%',
                  height: 'auto',
                  objectFit: 'cover',
                  p: 0.5,
                }}
                src={src}
                alt={`Renarration image ${index + 1}`}
              />
            ))}
          </Box>
        </CardMedia>
        <CardContent sx={{ maxHeight: '200px', overflowY: 'auto' }}>
          <div dangerouslySetInnerHTML={{ __html: removeMedia(block.content) }} />
          {/* <Typography>{desc}</Typography> */}
        </CardContent>

        { !noActions && (
        <CardActions>
          <Button size="small" color="primary" onClick={() => { navigate('/edit-rennaration', { state: block.id }); }}>
            {block.rennarationStatus ? 'Update' : 'Create'}
          </Button>
          <Button size="small" color="primary" onClick={deleteBlock}>
            Delete
          </Button>
        </CardActions>
        )}
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default RenarrationBlock;
