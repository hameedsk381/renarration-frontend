import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Stack, TextField, Snackbar, Alert, IconButton, Box, Typography } from '@mui/material';
import { ArrowBack, Audiotrack, Cancel, Image, VideoLibraryOutlined } from '@mui/icons-material';
import RenarrationBlock from './RenarrationBlock';
import Recording from './Recording';
import { updateAnnotatedBlock } from '../redux/actions/annotationActions';
import { serverApi, uploadFileApi } from '../apis/extractApis';
import axios from 'axios';

const EditRennarationBlock = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blockId = location.state;
  const annotatedBlocks = useSelector(state => state.annotation.annotatedBlocks);
  const selectedBlock = annotatedBlocks.find(block => block.id === blockId);
  const [formData, setFormData] = useState({
    description: selectedBlock.desc || '',
    audio: selectedBlock.aud || null,
    image: selectedBlock.img || null,
    video: selectedBlock.vid || null
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [updateSnackbarOpen, setUpdateSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  useEffect(() => {
    console.log(selectedBlock);
  }, [selectedBlock]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (mediaType, event) => {
    const file = event.target.files[0];

    if (file) {
      const formDataMedia = new FormData();
      formDataMedia.append('file', file);

      try {
        const response = await axios.post(uploadFileApi, formDataMedia, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response);
        setFormData(prevFormData => ({ ...prevFormData, [mediaType]: `${serverApi}/${response.data}` }));
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleCancelMedia = (mediaType) => {
    setFormData({ ...formData, [mediaType]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description) {
      setSnackbarOpen(true);
      return;
    }

    dispatch(updateAnnotatedBlock(blockId, {
      id: blockId,
      content: selectedBlock.content,
      desc: formData.description,
      aud: formData.audio,
      vid: formData.video,
      img: formData.image,
      rennarationStatus: true
    }));
    setSnackbarMessage('Renarration block updated successfully!');
    setUpdateSnackbarOpen(true);

    setTimeout(() => {
      navigate('/create-rennaration');
    }, 3000);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
    setUpdateSnackbarOpen(false);
  };

  return (
    <Container maxWidth='md' sx={{ my: 2, p: 2 }}>
      <Button variant="contained" color="primary" startIcon={<ArrowBack />} size='small' sx={{ mb: 2 }} onClick={() => navigate('/create-rennaration')}>
        Go Back
      </Button>
      <RenarrationBlock block={selectedBlock} noActions={true} />
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
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
          Please fill in the description.
        </Alert>
      </Snackbar>
      <Snackbar open={updateSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const UploadInput = ({ type, icon, formData, handleFileChange, handleCancelMedia }) => {
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
        <Button variant="contained" component="span" startIcon={icon}>
          Upload {type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>
      </label>
      {formData[type] && (
        <Box mt={2} position="relative">
          {type === 'image' && <img src={formData[type]} alt="Preview" width="100%" />}
          {type === 'audio' && <audio controls src={formData[type]} />}
          {type === 'video' && <video controls width="100%" src={formData[type]} />}
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
};

export default EditRennarationBlock;
