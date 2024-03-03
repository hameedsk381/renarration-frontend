import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Container, Stack, TextField, Snackbar, Alert, IconButton, Box, Typography, CircularProgress,
} from '@mui/material';
import {
  ArrowBack, Audiotrack, Cancel, Image, VideoLibraryOutlined,
} from '@mui/icons-material';
import axios from 'axios';
import RenarrationBlock from './RenarrationBlock';
import Recording from './Recording';
import { updateAnnotatedBlock } from '../redux/actions/annotationActions';
import { serverApi, uploadFileApi } from '../apis/extractApis';
import { extractPublicId } from '../utils/extractPublicId';

function EditRennarationBlock() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blockId = location.state;
  const annotatedBlocks = useSelector((state) => state.annotation.annotatedBlocks);
  const selectedBlock = annotatedBlocks.find((block) => block.id === blockId);
  const [formData, setFormData] = useState({
    description: selectedBlock.desc || '',
    audio: selectedBlock.aud || null,
    image: selectedBlock.img || null,
    video: selectedBlock.vid || null,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [updateSnackbarOpen, setUpdateSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // Inside EditRennarationBlock component
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // console.log(selectedBlock);
  }, [selectedBlock]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (mediaType, event) => {
    const file = event.target.files[0];
    // if (file.size > 10485760) {
    //   setSnackbarMessage('File size exceeds 10MB limit. Please choose a smaller file.');
    //   setSnackbarOpen(true);
    //   return;
    // }
    setFormData((prevFormData) => ({ ...prevFormData, [mediaType]: file }));
  };
  const handleCancelMedia = async (mediaType) => {
    setFormData({ ...formData, [mediaType]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description) {
      setSnackbarOpen(true);
      return;
    }

    try {
      setLoading(true); // Set loading state to true

      const updatedFormData = { ...formData };

      // Iterate over each media type and handle file upload
      for (const mediaType of ['audio', 'image', 'video']) {
        const file = formData[mediaType];

        if (file) {
          const formDataMedia = new FormData();
          formDataMedia.append('file', file);

          const response = await axios.post(uploadFileApi, formDataMedia, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          // Update the formData with the stored path
          updatedFormData[mediaType] = response.data;
        }
      }

      // Dispatch the updated annotated block with the stored file paths
      dispatch(updateAnnotatedBlock(blockId, {
        id: blockId,
        content: selectedBlock.content,
        desc: formData.description,
        aud: updatedFormData.audio,
        vid: updatedFormData.video,
        img: updatedFormData.image,
        rennarationStatus: true,
      }));

      setSnackbarMessage('Renarration block updated successfully!');
      setUpdateSnackbarOpen(true);
      setLoading(false); // Set loading state to true

      setTimeout(() => {
        navigate('/create-rennaration');
      }, 3000);
    } catch (error) {
      // console.error('Error uploading file:', error);
      setSnackbarMessage('Error uploading file. Please try again later.');
      setUpdateSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
    setUpdateSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ my: 2, p: 2 }}>
      <Button variant="contained" color="primary" startIcon={<ArrowBack />} size="small" sx={{ mb: 2 }} onClick={() => navigate('/create-rennaration')}>
        Go Back
      </Button>
      <RenarrationBlock block={selectedBlock} noActions />
      <form onSubmit={handleSubmit}>
        <Stack my={4} gap={2}>
          <TextField
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <Recording />
          <UploadInput type="audio" icon={<Audiotrack />} formData={formData} handleFileChange={handleFileChange} handleCancelMedia={handleCancelMedia} />
          <UploadInput type="image" icon={<Image />} formData={formData} handleFileChange={handleFileChange} handleCancelMedia={handleCancelMedia} />
          <UploadInput type="video" icon={<VideoLibraryOutlined />} formData={formData} handleFileChange={handleFileChange} handleCancelMedia={handleCancelMedia} />
          <Button variant="contained" color="primary" type="submit" disabled={loading} startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}>
            {' '}
            {/* Disable the button when loading */}
            {loading ? 'Submitting...' : 'Submit'}
            {' '}
            {/* Show different text when loading */}
          </Button>
        </Stack>
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={updateSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

function UploadInput({
  type, icon, formData, handleFileChange, handleCancelMedia,
}) {
  return (
    <Box mb={2}>
      <input
        accept={`${type}/*`}
        style={{ display: 'none' }}
        id={`raised-button-file-${type}`}
        multiple
        type="file"
        onChange={(e) => handleFileChange(type, e)}
        size={100000000} // Allow max of 100mb input
      />
      <label htmlFor={`raised-button-file-${type}`}>
        {formData[type] ? (
          null
        ) : (
          <Button variant="contained" component="span" startIcon={icon}>
            Upload
            {' '}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        )}
      </label>
      {formData[type] && (
        <Box mt={2} position="relative">
          <React.Suspense fallback={<CircularProgress/>}>
            {type === 'image' && <img src={formData[type] instanceof File ? URL.createObjectURL(formData[type]) : formData[type]} alt="Preview" width="100%" />}
            {type === 'audio' && <audio controls src={formData[type] instanceof File ? URL.createObjectURL(formData[type]) : formData[type]} />}
            {type === 'video' && <video controls width="100%" src={formData[type] instanceof File ? URL.createObjectURL(formData[type]) : formData[type]} />}
          </React.Suspense>
          <IconButton
            color="error"
            onClick={() => handleCancelMedia(type)}
            sx={{ position: 'absolute', top: 0, right: 0 }}
          >
            <Cancel />
          </IconButton>
        </Box>
      )}

    </Box>
  );
}

export default EditRennarationBlock;
